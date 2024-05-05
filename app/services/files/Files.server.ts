import { PassThrough } from "stream";

import { writeAsyncIterableToWritable } from "@remix-run/node";
import AWS from "aws-sdk";

const ThrowStorageConfigError = () => {
  throw new Error(`Storage is missing required configuration.`);
};

const { STORAGE_ACCESS_KEY, STORAGE_SECRET, STORAGE_REGION, STORAGE_BUCKET } =
  process.env;

if (
  !(STORAGE_ACCESS_KEY && STORAGE_SECRET && STORAGE_REGION && STORAGE_BUCKET)
) {
  ThrowStorageConfigError();
}

class Files {
  private static uploadStream({
    Key,
  }: Pick<AWS.S3.Types.PutObjectRequest, "Key">) {
    if (
      !(
        STORAGE_ACCESS_KEY &&
        STORAGE_SECRET &&
        STORAGE_REGION &&
        STORAGE_BUCKET
      )
    ) {
      ThrowStorageConfigError();
      return;
    }

    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: STORAGE_ACCESS_KEY,
        secretAccessKey: STORAGE_SECRET,
      },
      region: STORAGE_REGION,
    });
    const pass = new PassThrough();
    return {
      writeStream: pass,
      promise: s3.upload({ Bucket: STORAGE_BUCKET, Key, Body: pass }).promise(),
    };
  }

  private static async uploadStreamToS3(data: any, filename: string) {
    const stream = this.uploadStream({
      Key: filename,
    });
    if (!stream) {
      ThrowStorageConfigError();
      return;
    }
    await writeAsyncIterableToWritable(data, stream.writeStream);
    const file = await stream.promise;
    return file.Location;
  }

  public static async s3UploadHandler({
    name,
    filename,
    data,
  }: Record<string, string>) {
    if (name !== "img") {
      return undefined;
    }
    const uploadedFileLocation = await this.uploadStreamToS3(data, filename!);
    return uploadedFileLocation;
  }
}

export default Files;
