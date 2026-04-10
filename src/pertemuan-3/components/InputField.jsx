export default function InputField ({ label, type, placeholder}){
    return (
        <div className="mb-3">
            <label className="block text-fuchsia-900 font-medium mb-1">{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
    )
}