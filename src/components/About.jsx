import React from 'react';
import './about.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Finance Tracking System</h1>
      <p>
        Welcome to our Finance Tracking System, your reliable partner in managing and tracking your personal finances. Our platform is designed to help you take control of your financial life by providing intuitive tools and insights.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower individuals to make informed financial decisions, achieve their financial goals, and lead a financially healthy life. We believe that financial literacy and efficient management are key to financial success.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Expense Tracking: Monitor your spending and categorize expenses for better understanding.</li>
        <li>Budget Planning: Create and manage budgets to keep your finances on track.</li>
        <li>Financial Goals: Set and track your financial goals to stay motivated and focused.</li>
        <li>Reports and Insights: Get detailed reports and insights to analyze your financial habits.</li>
        <li>Secure and Private: Your financial data is securely stored and privacy is our top priority.</li>
      </ul>
    </div>
  );
};

export default About;
