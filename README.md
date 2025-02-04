# Shangri-La Petition Platform (SLPP)

The **Shangri-La Petition Platform (SLPP)** is a web-based application that allows citizens to create, sign, and manage petitions, with an oversight by a Petitions Committee. The platform is built using **Spring Boot** for the backend, **React** with **Tailwind CSS** for the frontend and **MySQL** for data storage.

---

## Prerequisites

### General Requirements

1. **Java Development Kit (JDK)**: Version `18.0.2` or higher
   - Ensure Java is installed and add it to your system's PATH.
   - Check your version
     ```bash
     java --version
     ```
2. **MySQL Server**: Version `8.0` or higher
   - Set up a MySQL database named `slpp`.
   - Create a user with the following credentials:
     - **Username**: `user_name` (Please replace with your username)
     - **Password**: `Password@123!`(Please replace with your password)
3. **Node.js and npm**: Version `22.11.0` or higher for Node.js, and `10.9.0` or higher for npm
   - Check your version
     ```bash
     node -v
     npm -v
     ```

### Frontend-Specific Requirements

- **npm dependencies**: Install it using `npm install`.
- **mkcert** (optional for HTTPS setup):
  - Install and configure if HTTPS is required for the frontend. (Detailed steps below)

### Backend-Specific Requirements

- **Spring Boot**: Version `3.1.4`.
- **Keytool**: For generating self-signed certificates (used to enable HTTPS on the backend).

---

## Setting Up the Application

### Step 1: Setting Up the Backend

1. **Extract (unzip) the folder**:

   ```bash
   cd slpp-backend
   ```

2. **Set up the database**:
   - Use the `slpp_database.sql` file in the zip.

# Database Configuration

Replace "localhost" with the hostname of your database server if it's hosted remotely.
Replace "slpp" with your database name.
Use your own database credentials by replacing YOUR_USERNAME and YOUR_PASSWORD.
spring.datasource.url=jdbc:mysql://localhost:3306/slpp?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

````

3. **Generate a self-signed certificate for HTTPS**:
   Run the following command:
   ```bash
   keytool -genkeypair -alias slpp -keyalg RSA -keysize 2048 -validity 365 \
     -keystore keystore.p12 -storetype PKCS12 -storepass SLPPBackend@123! \
     -keypass SLPPBackend@123! -dname "CN=localhost, OU=Personal, O=Personal, L=Leicester, ST=Leicester, C=GB"
````

- Place the `keystore.p12` file in the `src/main/resources` directory.

4. **Install Dependenceis and Build and run the backend**:
   ```bash
   mvn clean install
   ```
   ```bash
   mvn spring-boot:run
   ```
   - Access the backend at: `https://localhost:8443`.

---

### Step 2: Setting Up the Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd slpp-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **(Optional) Enable HTTPS**:

   - Uncomment the following lines in `.env`:
     ```env
     HTTPS=true
     SSL_CRT_FILE=certs/frontend-cert.pem
     SSL_KEY_FILE=certs/frontend-key.pem
     ```
   - Generate certificates using `mkcert`:
     ```bash
     mkcert -install
     mkcert -key-file frontend-key.pem -cert-file frontend-cert.pem localhost
     ```
   - Save the generated `.pem` files in a `certs` folder in the frontend directory.

4. **Run the frontend**:
   ```bash
   npm start
   ```
   - Access the frontend at:
     - `http://localhost:3000` (if HTTPS is disabled)
     - `https://localhost:3000` (if HTTPS is enabled)

---

## Features and Instructions

### Petitioner Features

- **Registration**: Register with name, email, password, date of birth, and BioID. QR code scanning is available for BioID autofill.
- **Login**: Access the Petitioner Dashboard upon successful login.
- **Dashboard**:
  - View all petitions.
  - Create new petitions.
  - Sign open petitions.

### Petitions Committee Features

- **Login**: Use the pre-configured credentials:
  - **Email**: `admin@petition.parliament.sr`
  - **Password**: `2025%shangrila`
- **Dashboard**:
  - View all petitions.
  - Set/update the signature threshold.
  - Respond to petitions that meet the required threshold.

### REST API Endpoints

- There are unprotected (because they need to be accessed by everyone without authorization) endpoints as below
- `GET /slpp/petitions`: Retrieve all petitions.
- `GET /slpp/petitions?status=open`: Retrieve open petitions.
- `POST /slpp/petitioner/register`: Register petitioner
- `POST /slpp/petitioner/login`: Login Petitioner
- `POST /slpp/petitions-committee/login`
- There are secured endpoints as below
- `POST /slpp/petitions/create`
- `POST /slpp/petitions/{petitionId}/sign`
- `GET /slpp/petitions/{petitionId}/signed`
- `GET /slpp/petitioner/dashboard`
- `POST /slpp/petitions-committee/threshold`
- `GET /slpp/petitions-committee/threshold`
- `POST /slpp/petitions/{petitionId}/respond`
- `GET /slpp/petitions/{petitionId}`

- Petitioner Role: Access to petition creation, view all petitions,signing, and personal dashboard.
- Petitions Committee Role: Access to manage thresholds, view all petitions, personal dashboard and respond to them.

---

## Testing and Debugging

- Use **browser developer tools** to debug the frontend.
- Backend logs for API calls and SQL queries are enabled in `application.properties`.
- Use **Postman** to test API endpoints. Include the Bearer token in the Authorization header.

---

## Notes

- The application uses JWT for authentication and Tailwind CSS for styling.
- A self-evaluation form with screenshots is included in the submission.
