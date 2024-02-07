module.exports = {
  generateUniqueCode: () => {
    function generateRandomAlphabets() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 4; i++) {
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
      return result;
    }
    function generateRandomNumbers() {
      return Math.floor(Math.random() * 100000).toString();
    }
    const currentDate = new Date().getTime().toString().slice(-6);
    const uniqueCode =
      generateRandomAlphabets() +
      '-' +
      generateRandomNumbers() +
      '-' +
      currentDate;

    return uniqueCode;
  },
};
