import './TextInput.css'


export default function TextInput({type, placeholder, inputName, value, onChange, error}){

    return(
      <div className='TextInput-container'>
  <input
        className={`TextInput ${error ? "error" : ""}`}
        type={type}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChange}
      />
      <span className='TextInput-error'>{error && error}</span>
      </div>
     
      
 
    )
}