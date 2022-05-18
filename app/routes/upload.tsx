// ./app/routes/upload.tsx

import {
  ActionFunction,
  Form,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "remix";

export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: "../modules/blog/media",
  file: ({ filename }) => filename,
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler
  );
  console.log(formData.get("upload")); // will return the filename

  return {};
};

const Upload = () => {
  return (
    <Form method="post" encType="multipart/form-data">
      <input type="file" name="upload" />
      <button type="submit">upload</button>
    </Form>
  );
};

export default Upload;
