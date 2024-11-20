/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Nếu bạn sử dụng file HTML gốc
    "./src/**/*.{js,ts,jsx,tsx}", // Đảm bảo tất cả các file JSX, TSX trong src được bao gồm
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
