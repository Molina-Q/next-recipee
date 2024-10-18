import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2>Page Not Found</h2>
      <p>Could not the find requested resource</p>
    </div>
  )
}