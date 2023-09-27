import Wrapper from '@/components/Common/Wrapper/Wrapper'
import TypingAnimation from '@/components/TypingAnimation/TypingAnimation'
import Image from 'next/image'
import ProfileImg from '@/assets/profile.jpg'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa6'
import BlogSectionList from '@/components/BlogSection/BlogSectionList'
import postService from '@/services/post.service'
import { Suspense } from "react";
import { Button } from '@/components/Button/Button'
import GradientText from '@/components/GradientText/GradientText'
import SocialCircle from '@/components/SocialCircle/SocialCircle'
import SectionBlogSkeleton from '@/components/Skeleton/SectionBlogSkeleton'
import LastCommentList from '@/components/LastCommentSection/LastCommentList'
import LastCommentSkeleton from '@/components/Skeleton/LastCommentSkeleton'
import commentService from '../services/comment.service'

export default function Home() {
  const posts = postService.getPosts({ page: 1 })
  const lastComments = commentService.getLastComments()

  return (
    <main>

      {/* home cover */}
      <section className='home-cover'>
        <Wrapper className='relative z-[2]'>
          <div className='flex md:py-24 xl:px-16 py-16'>
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
                <Button size={"custom"} className='px-4 sm:py-1.5 py-1 rounded' >
                  Subscribe
                </Button>
              </form>

              {/* social box */}
              <div className='flex items-center gap-4 mt-8'>
                <SocialCircle href={"#"} size={"sm"}>
                  <FaFacebookF />
                </SocialCircle>
                <SocialCircle href={"#"} size={"sm"}>
                  <FaInstagram />
                </SocialCircle>
                <SocialCircle href={"#"} size={"sm"}>
                  <FaTwitter />
                </SocialCircle>

              </div>
            </div>

            <div className='hidden lg:block lg:w-2/4'>
              <Image className='w-2/3 picture-anime ml-auto rounded-xl' alt='profile picture' src={ProfileImg} />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* recent posts */}
      <section className='relative before:absolute before:w-full before:bottom-full before:h-[100px] before:bg-gradient-to-t before:from-on_light_body_bg dark:before:from-on_dark_body_bg before:to-transparent'>
        <Wrapper>
          <div className='py-12 xl:px-16'>
            <div>
              <h2 className='gradient-text text-[25px] md:text-[35px] lg:text-[45px] font-bold'>Recent posts</h2>
              <p className='dark:text-on_dark_text_gray text-[18px] text-[#708ab0] transition-colors'>Don&#39;t miss the latest trends</p>
            </div>
            <div className='mt-12 md:space-x-6 md:flex space-y-12 md:space-y-0'>
              {/* blogs list */}
              <div className='md:w-2/3'>
                <Suspense
                  fallback={(
                    <div className='lg:flex lg:flex-wrap lg:gap-6 space-y-6 lg:space-y-0'>
                      {
                        Array(8).fill(0).map((_, index) => <SectionBlogSkeleton key={index} />)
                      }
                    </div>
                  )}>
                  <BlogSectionList postPromise={posts} />
                </Suspense>
              </div>

              {/* sidebar  */}
              <div className='md:w-1/3'>
                <div className='dark:border-on_dark_border border-gray-300 border rounded-xl bg-on_light_card_bg dark:bg-on_dark_card_bg p-6 transition-colors'>
                  <h2 className='pb-[10px] relative after:content-[""] after:absolute after:w-1/3 after:h-0.5 mb-4 after:bg-primary-gradient
                                 after:bottom-0 after:left-0'>
                    <GradientText className='text-xl font-bold'>
                      Last Comment
                    </GradientText>
                  </h2>
                  <Suspense
                    fallback={(
                      <div className='divide-y divide-[#c2d4ee] dark:divide-on_dark_border space-y-6'>
                        {
                          Array(5).fill(0).map((_, index) => {
                            return <LastCommentSkeleton key={`cmt-${index}`} />
                          })
                        }
                      </div>
                    )}>
                    <LastCommentList data={lastComments} />
                  </Suspense>

                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </main>
  )
}
