import Image from 'next/image'
import Right from '../icons/Right'

export default function Hero () {
  return (
    <section className='hero mt-4'>
      <div className='py-12'>
        <h1 className='text-4xl font-semibold leading-snug'>
          Everything <br/>
          is better <br/>
          with a&nbsp;
          <span className='text-primary'>Pizza</span>
        </h1>
        <p className='my-6 text-gray-500 text-sm'>
          Pizza is the missing peice that makes every day complete, a simpe yet delicious joy in life
        </p>
        <div className='flex gap-4 text-sm'>
          <button className='bg-primary  justify-center uppercase flex gap-2 items-center text-white px-4 py-2 rounded-full'>Order Now
          <Right />
          </button>
          
          <button className='flex items-center gap-2 py-2 text-gray-600 font-semibold border-0'>
            Learn More
            <Right />
          </button>
        </div>

      </div>
      <div className='relative'>
        <Image src={'/pizza (1).png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />

      </div>
    </section>
  )
}
