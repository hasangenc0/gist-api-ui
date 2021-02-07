/*
 reads file client side.
 used for sending file content as a string to gist api
*/
export const getFileContent = (file: File, callback: (arg: any) => any) => {
  if (typeof window.FileReader !== 'function' || !file)
    return null;

  const fr = new FileReader();
  fr.onload = callback;
  fr.readAsText(file, 'UTF-8');
};
