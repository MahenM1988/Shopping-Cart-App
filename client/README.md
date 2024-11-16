# Shopping Cart App

## Overview
The Shopping Cart App offers a user-friendly interface to browse products, add items to your cart, and manage your shopping experience effortlessly. Product details are currently stored in a JSON file, with certain limitations: users can only add quantities available in stock, and client-side data modification is not supported.

## Key Features

- **Real-Time Cart Updates**: Enjoy immediate updates to your shopping cart, reflecting the latest stock levels for a seamless shopping experience.

- **Payment Gateway Integration**: Upon checkout, you'll be directed to a secure payment gateway to verify your card details. This includes:
  - **Luhn Algorithm Validation**: Ensures the card number is valid.
  - **Expiry Date Check**: Compares the expiry date against the current date.
  - **Invoice Generation**: The cart's contents are sent to the payment gateway, resulting in a generated invoice.

## Areas for Improvement

- **Database Integration**: Transition from the JSON file to a MongoDB database, facilitating easier data management and scalability. This can pave the way for converting the project into a MERN stack application.

## Technical Details

- **Current Storage**: Product details are stored in a JSON file.
- **Real-Time Functionality**: Consider implementing WebSockets to enhance real-time cart updates.
- **Secure Transactions**: Integrate a payment gateway for safe and efficient payment processing, including card validation.

This README provides a comprehensive overview of the current functionalities and potential enhancements for the Shopping Cart App. Contributions and suggestions for improvement are highly encouraged!
