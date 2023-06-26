const generateRandomId = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000000);
  const uniqueID = `${timestamp}_${randomNum}`;
  return uniqueID;
};

export default generateRandomId;
