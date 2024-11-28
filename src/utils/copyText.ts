export const CopyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Success message (optional)
      
    })
    .catch((error) => {
      console.error("Error copying text: ", error);
      //llo
    });
};
