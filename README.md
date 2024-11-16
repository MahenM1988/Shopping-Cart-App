## E-Commerce App

This E-Commerce app integrates **Passport.js** for user authentication and **Stripe** for payment verification. Product details are currently stored in a static **JSON file**, with a few limitations. Users can only add quantities available in stock, and modifications to the data on the client side are not supported.

### Testing Credentials:

- **Admin Username**: `Admin`
- **Password**: `123`
- **Payment Gateway Test Card**:
    - **Card Number**: `4242 4242 4242 4242`
    - **Expiry Date**: Any future date
    - **CVV**: Any 3-digit number
    - **Zip Code**: Any 5 digits

### Limitations:

This app currently does not support real-time database updates or transaction locking, which are essential for preventing multiple users from purchasing the same product simultaneously. In a production-grade E-Commerce platform, **locking mechanisms** are critical to handle concurrent users and ensure data integrity. For demonstration purposes, however, database changes are permanent for each user, which may result in a disjointed user experience.

### Real-World Considerations:

In a production setting, an **interactive dynamic database** should be used to manage users, sessions, and logistics for order processing. This would also include transaction locks to handle inventory accurately and prevent race conditions when multiple users interact with the same products in real time.

Currently, the app hardcodes a sample user on the server, and the **register route** to add new users is not implemented. However, **Passport.js** supports easy integration with third-party authentication providers, such as **OAuth** or social media logins, which are widely adopted in the industry.

### Performance Enhancements:

To improve performance, **Redis** can be introduced as an in-memory data store for caching frequently accessed data, reducing the load on the primary database. Redis also supports various data structures, making it ideal for use cases such as **session management**, **real-time analytics**, and more. Its low-latency and high-throughput capabilities are crucial for scalable applications.

### Development and Deployment:

During development, **Docker** can be used to containerize the application, providing a lightweight, self-contained environment that includes everything needed to run the app—from code to libraries and dependencies. This approach simplifies both development and deployment, ensuring that the app behaves consistently across different environments (local machine, test servers, production environments, etc.).
