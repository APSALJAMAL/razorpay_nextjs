# Razorpay Billing App with NeonDB

This project is a simple billing page powered by Razorpay for payments and NeonDB (PostgreSQL) for data storage. It allows users to view a bill and pay using UPI or other Razorpay-supported payment methods.

---

## 🛠️ Features

- Fetch bill details by ID
- Display bill info (name, email, phone, product, price)
- Razorpay integration for online payments
- UPI testing in development
- NeonDB (PostgreSQL) as the database

---

## 🧾 Database Schema

```sql
CREATE TABLE bill_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  notes TEXT,
  price NUMERIC(10, 2),
  product VARCHAR(255),
  status VARCHAR(50)
);

---

## 🧾.env

```
# PostgreSQL (NeonDB) connection string
DATABASE_URL=postgres://username:password@host/dbname

# Razorpay API credentials (Test mode or Live mode)
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

#   r a z o r p a y _ n e x t j s 
 
 
