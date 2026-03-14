import EmailSignup from './EmailSignup'

const Hero = () => {
  return (
    <div className='relative h-screen text-white bg-black'>

      <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
        <h1 className='text-6xl font-bold mb-4'>Unlimited movies, <br />shows, and more</h1>
        <p className='text-xl mb-2'>Starts at ₹149. Cancel anytime.</p>
        <p className='mb-4'>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <EmailSignup />
      </div>

    </div>
  )
}

export default Hero

