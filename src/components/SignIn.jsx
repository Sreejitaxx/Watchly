import { useRef, useState } from "react";
import { checkValidData } from "../utils/validation";
import background from "../assets/watchly logo.png";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [validationFieldError, setValidationFieldError] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

 const handleformSubmit = (e) => {
  e.preventDefault();

  const email = emailRef.current.value;
const password = passwordRef.current.value;

console.log("EMAIL:", email);
console.log("PASSWORD:", password);

  const validationError = checkValidData(email, password);
  setValidationFieldError(validationError);

  if (validationError.email || validationError.password) {
    console.log("Validation failed");
    return;
  }

  if (!isSignIn) {
    console.log("Registering user...");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Registered:", userCredential.user);
navigate("/browse");
      })
      .catch((error) => {
        console.log("Register Error:", error.message);
      });

  } else {
    console.log("Signing in user...");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Logged In:", userCredential.user);
navigate("/browse");
      })
      .catch((error) => {
        console.log("Login Error:", error.message);
      });
  }
};

  return (
    <div className="relative h-screen w-full text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover animate-bgZoom"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/62"></div>

      {/* Bottom text */}
      {!showForm && (
        <div className="absolute bottom-20 w-full text-center space-y-3">

          <p
            className="text-xl cursor-pointer hover:underline"
            onClick={() => {
              setIsSignIn(true);
              setShowForm(true);
            }}
          >
            Welcome back! <span className="font-semibold">Sign in from here</span>
          </p>

          <p
            className="text-lg cursor-pointer text-gray-300 hover:underline"
            onClick={() => {
              setIsSignIn(false);
              setShowForm(true);
            }}
          >
            New user? <span className="font-semibold text-white">Register here</span>
          </p>

        </div>
      )}

      {/* Sign In / Register form */}
      {showForm && (
        <div className="absolute inset-0 flex justify-center items-center">

          <div className="bg-black/80 p-10 rounded-lg w-96 backdrop-blur-md">

            <h1 className="text-3xl font-bold mb-6 text-center">
              {isSignIn ? "Sign In" : "Register"}
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleformSubmit}>

              {!isSignIn && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded bg-black border border-gray-400"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="p-3 rounded bg-black border border-gray-400"
              />

              {validationFieldError.email && (
                <p className="text-red-500 text-sm">
                  {validationFieldError.email}
                </p>
              )}

              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                className="p-3 rounded bg-black border border-gray-400"
              />

              {validationFieldError.password && (
                <p className="text-red-500 text-sm">
                  {validationFieldError.password}
                </p>
              )}

              <button
  type="submit"
  className="bg-red-600 py-3 rounded font-semibold hover:bg-red-700"
>
  {isSignIn ? "Sign In" : "Register"}
</button>

              <p
                className="text-sm text-gray-300 text-center cursor-pointer"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn
                  ? "New user? Register here"
                  : "Already registered? Sign in"}
              </p>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default SignIn;