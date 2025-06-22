// src/components/InputField.jsx

const InputField = ({ label, type = "text", value, onChange, name }) => (
  <div className="mb-6 relative group">
    {/* Floating label */}
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl 
                   text-gray-800 placeholder-transparent transition-all duration-300 ease-in-out
                   focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10
                   hover:border-gray-300 hover:bg-white/70
                   invalid:border-red-300 focus:invalid:border-red-500"
        placeholder={label}
        required
      />
      
      {/* Animated label */}
      <label 
        className="absolute left-4 top-3 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                   peer-focus:-top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-focus:rounded
                   peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded"
      >
        {label}
      </label>
      
      {/* Input decoration icons */}
      <div className="absolute right-3 top-3 transition-all duration-300">
        {type === "email" && (
          <svg className="w-5 h-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        )}
        {type === "password" && (
          <svg className="w-5 h-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
        {type === "text" && (
          <svg className="w-5 h-5 text-gray-400 peer-focus:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
    </div>
    
    {/* Focus ring effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 
                    group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
    
    {/* Bottom border animation */}
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 
                    peer-focus:w-full transition-all duration-300 rounded-full"></div>
  </div>
);

// ✅ THIS IS NECESSARY
export default InputField;