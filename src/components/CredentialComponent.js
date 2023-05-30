export default function CredentialComponent({onTextChange}) {
    return (
      <div>
        <div className="input-container">
          <label>Username</label>
          <input name="username" onChange={e => onTextChange(e.target)} type="text" />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input name="password" onChange={e => onTextChange(e.target)} type="password" />
        </div>
      </div>
    )
  }