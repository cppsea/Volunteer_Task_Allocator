import './TextInput.css'


export default function TextInput({type, placeholder, inputName, value, onChange}){

    return(

        <input
        className='TextInput'
        type={type}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChange}
      />
    )
}