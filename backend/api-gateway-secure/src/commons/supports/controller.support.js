function generateUniqueCode(name, lastName) {
    const initials = name.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 90000 + 10000); 

    return `${initials}-${timestamp}-${random}`;
}

module.exports = {
    generateUniqueCode
}
