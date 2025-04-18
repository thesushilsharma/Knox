# Knox
A user-friendly two-factor authentication (2fa) application that offers seamless and secure 2fa for your accounts. The **KNOX** application is built using **React Router 7** and **Appwrite**. It enables users to activate 2fa for their accounts, generate backup codes, and securely log in using one-time passwords (OTPS).

---

## Features

- **Two-Factor Authentication (2FA)**:
  - Generate a 2fa secret and QR code.
  - Verify OTPS using the generated secret.
- **Backup Codes**:
  - Generate and display 10 backup codes for emergency login.
- **Session Management**:
  - Use Appwrite's built-in session management for user authentication.
- **Error Handling**:
  - Graceful error handling for API calls and user feedback.
- **UI/UX**:
  - Modern and responsive UI using **Tailwind CSS**.

---

## Installation 
Clone the repository and install dependencies:

```bash
git clone https://github.com/thesushilsharma/Knox.git
cd Knox
npm install
npm run dev
```

---

## Prerequisites

Before running the project, ensure you have the following:

1. **Node.js** installed on your machine.
2. An **Appwrite** instance (self-hosted or cloud).
3. A **React Router 7** project set up.
4. VS Code or any Code
5. **2FA Packages** (haven’t yet decided):
   - [`otpauth`](https://www.npmjs.com/package/otpauth): A library for generating and validating one-time passwords (OTPs) using TOTP and HOTP algorithms.
   - [`otplib`](https://www.npmjs.com/package/otplib): A JavaScript library for generating and verifying OTPs based on RFC standards.
   - [`time2fa`](https://www.npmjs.com/package/time2fa): A lightweight library for time-based two-factor authentication (TOTP).
   
---

## Acknowledgements

- Appwrite for providing an excellent backend solution.
- React Router 7 for the powerful React framework.
- Tailwind CSS for the amazing utility-first CSS framework.

---

## Support 💬

If you encounter any issues or have questions, [open an issue](https://github.com/thesushilsharma/Knox/issues) on GitHub.

---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Please make sure to commit to making your changes.
- Submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is provided under the MIT License. See the [LICENSE](LICENSE) file for details.
