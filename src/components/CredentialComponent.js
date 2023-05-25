export default function CredentialComponent({onTextChange}) {
    return (
      <div>
        <p>
          <label>Username</label>
          <input name="username" onChange={e => onTextChange(e.target)} type="text" />
        </p>
        <p>
          <label>Password</label>
          <input name="password" onChange={e => onTextChange(e.target)} type="password" />
        </p>
      </div>
    )
  }