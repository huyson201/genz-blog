import Wrapper from '@/components/Common/Wrapper/Wrapper'
import TypingAnimation from '@/components/TypingAnimation/TypingAnimation'
import Image from 'next/image'
import ProfileImg from '@/assets/profile.jpg'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'
import BlogSection from '@/components/BlogSection/BlogSection'
import LastCommentSection from '@/components/LastCommentSection/LastCommentSection'
import Pagination from '@/components/Pagination/Pagination'

export default function Home() {
  return (
    <main>
      {/* home cover */}
      <section className='home-cover'>
        <Wrapper className='relative z-[2]'>
          <div className='flex py-24 xl:px-16 justify-between'>
            <div className='w-full lg:w-2/4'>
              <span className='dark:text-on_dark_text_gray font-bold text-[#7e9cc7] text-sm transition-colors'>Hello Everyone!</span>
              <h1 className='text-on_light_text_white dark:text-white text-[29px] xs:text-[34px] sm:text-[44px] md:text-[64px] font-extrabold transition-colors'>I&lsquo;m</h1>
              <TypingAnimation className='relative text-[29px] xs:text-[34px] sm:text-[44px] md:text-[64px] font-extrabold gradient-text' words={['Son Nguyen', "Developer"]} />
              <p className='text-[#7f92b0] lg:w-3/4'>
                I use animation as a third dimension by which to simplify experiences and kuiding thro each and every interaction. I’m not adding motion just to spruce things up, but doing it in ways that.
              </p>
              {/* subscribe */}

              <form className='subscribe-form'>
                <input className='w-full text-sm outline-none placeholder-[#7f92b0] text-[#7f92b0] bg-transparent' type="email" placeholder='Type your email address' />
                <button className='bg-primary-gradient bg-200% text-sm font-bold px-4 py-[10px] rounded-md text-white hover:bg-right transition-all'>
                  Subscribe
                </button>
              </form>

              {/* social box */}
              <div className='flex items-center gap-4 mt-8'>
                <Link href={"#"} className='social-links'>
                  <FaFacebookF />
                </Link>
                <Link href={"#"} className='social-links'>
                  <FaInstagram />
                </Link>
                <Link href={"#"} className='social-links'>
                  <FaTwitter />
                </Link>
              </div>
            </div>

            <div className='hidden lg:block lg:w-2/4'>
              <Image className='w-2/3 picture-anime ml-auto rounded-xl' alt='profile picture' src={ProfileImg} />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* recent posts */}
      <section>
        <Wrapper>
          <div className='py-12 xl:px-16'>
            <div>
              <h2 className='gradient-text text-[45px] font-bold'>Recent posts</h2>
              <p className='dark:text-on_dark_text_gray text-[18px] text-[#708ab0] transition-colors'>Don&#39;t miss the latest trends</p>
            </div>
            <div className='mt-12 md:space-x-6 md:flex space-y-12 md:space-y-0'>
              {/* blogs list */}
              <div className='md:w-2/3'>
                <div className='lg:flex lg:flex-wrap lg:gap-6 space-y-6 lg:space-y-0'>
                  {
                    Array(10).fill(0).map((_, index) => {
                      return <BlogSection key={`blog-${index}`} />
                    })
                  }
                </div>

                {/* pagination */}
                <Pagination className='mt-8' />
              </div>

              {/* sidebar  */}
              <div className='md:w-1/3'>
                <div className='dark:border-on_dark_border border-gray-300 border rounded-xl bg-on_light_card_bg dark:bg-on_dark_card_bg p-6 transition-colors'>
                  <h2 className='text-xl gradient-text font-bold pb-[10px] relative
                                 after:content-[""] after:absolute after:w-1/3 after:h-0.5 mb-10 after:bg-primary-gradient
                                 after:bottom-0 after:left-0'>
                    Last Comment
                  </h2>
                  {
                    Array(5).fill(0).map((_, index) => {
                      return <LastCommentSection key={`cmt-${index}`} isLast={index === 4} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </main>
  )
}
