import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
  localStorage.clear();
});

test("renders login page by default", () => {
  render(<App />);
  const homePageElement = screen.getByTestId("login-page");
  expect(homePageElement).toBeInTheDocument();
});

test("navigates to signup page", () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Sign Up/i));
  const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
  expect(signUpButton).toBeInTheDocument();
});

test("login works correctly", async () => {
  const token = "fake-token";
  const user = { id: 1, username: "testuser", email: "test@example.com" };

  mock.onPost("http://localhost:8080/api/auth/signin").reply(200, {
    response: {
      token,
      email: user.email,
      id: user.id,
      userName: user.username,
    },
  });

  render(<App />);

  fireEvent.change(screen.getByTestId("login-email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByTestId("login-password"), {
    target: { value: "password" },
  });
  const loginButton = screen.getByRole("button", { name: /Login/ });
  fireEvent.click(loginButton);

  // Wait for the asynchronous login request to complete
  await waitFor(() => {
    expect(localStorage.getItem("token")).toBe(token);
  });
  await waitFor(() => {
    // Parse the expected and received JSON strings into JavaScript objects
    const expectedUser = JSON.parse(JSON.stringify(user));
    const receivedUser = JSON.parse(localStorage.getItem("user")!);
    // Perform the assertion
    expect(receivedUser).toEqual(expectedUser);
  });
});

test("fetches and displays tasks", async () => {
  const user = { id: 1, username: "testuser", email: "test@example.com" };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", "fake-token");
  mock
    .onGet(`http://localhost:8080/api/v1/taskmanager?user_id=${user.id}`)
    .reply(200, [
      { id: "1", name: "Task 1", done: false },
      { id: "2", name: "Task 2", done: true },
    ]);

  render(<App />);

  await screen.findByText("Task 1");
  expect(screen.getByText("Task 2")).toBeInTheDocument();
});
