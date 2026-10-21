import { asset, initials } from '../../utils/asset'

export default function Avatar({ name, photo, size = 48 }) {
  if (photo) {
    return <img className="avatar" src={asset(photo)} alt={name} width={size} height={size} style={{ width: size, height: size }} />
  }
  return (
    <span className="avatar avatar-initials" style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials(name)}
    </span>
  )
}
