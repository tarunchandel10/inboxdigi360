function FormField({ icon, type, name, placeholder, value, onChange ,className,disabled=false }) {
  return (
      <div className="create-form-feild">
          {icon}
          <input type={type} disabled={disabled} className={`form-control ${className}`} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
      </div>
  );
}
export default FormField;