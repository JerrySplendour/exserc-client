"use client"

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { ReactNode, useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <main>
      <header className="flex w-full items-center justify-center gap-2 my-12 ">
        <div className="w-1/3 flex items-center justify-center lg:items-end lg:justify-end">
            <div className="flex gap-y-3 flex-col">
              <div className="flex items-center gap-3">
                <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
                <h1 className="text-lg lg:text-xl text-primary-1">Service providing website</h1>
              </div>
              <h2 className="font-bold text-3xl lg:text-[40px] text-black-1 lg:leading-[48px]">Discover Local <br /> Service Providers <br /> near You</h2>
              <h3 className="font-normal text-sm text-[#3C3742B2] mt-6 lg:mt-10">What do you need help with?</h3>
              <div className="flex items-center justify-between gap-3">
                <Button variant="default" size="sm" >Find Service Providers</Button>
                <Button variant="outline" size="sm" >Offer Your Services</Button>
              </div>
          </div>
        </div>
        <div className="relative w-1/3 h-[calc(100vh-90px)] bg-[#EFEEF0B2] xl:block hidden overflow-hidden">
          <figure className="w-[280px] h-[300px] absolute top-0 left-0 animate-slidedown z-0">
            <Image
              src="/assets/images/hero-1.png"
              alt="hero-1"
              width={380}
              height={400}
              className="object-cover block"
            />
          </figure>
          <figure className="w-[320px] h-[350px] absolute bottom-16 right-0 animate-slideup z-0">
            <Image
              src="/assets/images/hero-2.png"
              alt="hero-2"
              width={400}
              height={600}
              className="object-cover block"
            />
          </figure>
        </div>
      </header>
      <section className="wave-1-bg w-full min-h-screen flex items-center justify-center pt-36 md:pt-56 pb-16">
        <div className="flex flex-col items-center justify-center gap-y-11">
          <div className="flex items-center gap-3">
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
            <h1 className="text-xl text-primary-1">How we can help you</h1>
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
          </div>
          <div>
            <h1 className="font-bold text-2xl md:text-[32px] md:leading-[40px] text-center text-black-1">Join Nigeria’s service market <br />
            for Service providers</h1>
          </div>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 grid-rows-1 gap-x-8" data-aos="zoom-in">
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center w-[250px] p-10">
              <figure className="w-[68px] h-[68px]">
              <Image
                src="/assets/images/workman.png"
                alt="workman"
                width={68}
                height={68}
                className="object-cover block"
              />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Suitable Service <br />
              Providers</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center w-[250px] p-10">
              <figure className="w-[68px] h-[68px]">
              <Image
                src="/assets/images/money.png"
                alt="money"
                width={68}
                height={68}
                className="object-cover block"
              />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Efficient Payment <br /> System</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center w-[250px] p-10">
              <figure className="w-[68px] h-[68px]">
              <Image
                src="/assets/images/handshake.png"
                alt="handshake"
                width={68}
                height={68}
                className="object-cover block"
              />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Relaiable Service <br />
              Providers</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center gap-y-8 md:items-start justify-center gap-x-4 xl:gap-x-0 px-4">
        <div className="relative w-full md:w-auto xl:w-1/4">
          <figure className="w-[200px] xl:w-[314px] h-[452px] animate-in z-10">
              <Image
                src="/assets/images/tailor.png"
                alt="hero-1"
                width={314}
                height={452}
                className="object-cover block"
              />
          </figure>
          <figure className="w-[40px] xl:w-auto absolute top-0 left-0 z-0">
              <Image
                src="/assets/images/premscent.png"
                alt="premscent"
                width={65}
                height={15}
                className="w-full object-cover block"
              />
          </figure>
        </div>
        <div className="flex flex-col xl:w-1/4 items-start justify-center gap-y-6 pt-20">
          <div className="flex items-center gap-3">
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
            <h1 className="text-xl text-primary-1">About Premscent</h1>
          </div>
          <h2 className="font-bold text-3xl xl:text-[40px] text-black-1 xl:leading-[48px]">Get your needs sorted <br /> out from your place of <br /> comfort</h2>
          <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q
          </p>
          <div className="flex gap-x-4 mt-8">
          <figure className="min-w-[27px] min-h-[35px] animate-in z-0">
              <Image
                src="/assets/images/location.png"
                alt="location"
                width={27}
                height={35}
                className="object-cover block"
              />
          </figure>
          <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q
          </p>
          </div>
          <Button variant="outline" className="font-light gap-2" size="sm" ><span>Learn more</span> <ArrowRightIcon fontSize={12} /> </Button>
        </div>
      </section>
      <section className="flex items-start justify-center my-10 lg:my-32 gap-x-3 lg:gap-x-10 box-bg-image">
        <div>
          <div className="flex flex-col items-center lg:items-start justify-center gap-y-6 pt-8 lg:pt-20">
            <div className="flex items-center gap-3">
              <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
              <h1 className="text-xl text-primary-1">About Premscent</h1>
            </div>
            <h2 className="font-bold text-center lg:text-start text-2xl xl:text-[40px] text-black-1 xl:leading-[48px]">We Provide Exclusive <br /> Marketing Service</h2>
            <div className="flex flex-col items-start gap-y-16 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-8 gap-2 lg:gap-8">
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                      <Image
                        src="/assets/images/speaker.png"
                        alt="location"
                        width={50}
                        height={42}
                        className="object-cover block"
                      />
                  </figure>
                  <div className="max-w-[204px]">
                    <h3 className="text-center tracking-widest text-lg font-bold text-black-1">Effective Business <br /> Promotion</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                        adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                      <Image
                        src="/assets/images/laptop.png"
                        alt="location"
                        width={50}
                        height={42}
                        className="object-cover block"
                      />
                  </figure>
                  <div className="max-w-[204px]">
                    <h3 className="text-start text-lg font-bold text-black-1">Transcaction Tracking</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                        adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                      <Image
                        src="/assets/images/processing.png"
                        alt="location"
                        width={50}
                        height={42}
                        className="object-cover block"
                      />
                  </figure>
                  <div className="max-w-[204px]">
                    <h3 className="text-start text-lg font-bold text-black-1">Smooth Processing</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                        adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                      <Image
                        src="/assets/images/chat.png"
                        alt="location"
                        width={50}
                        height={42}
                        className="object-cover block"
                      />
                  </figure>
                  <div className="max-w-[204px]">
                    <h3 className="text-start text-lg font-bold text-black-1">Increase in Business output</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                        adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="font-light gap-2" size="sm" ><span>Learn more</span> <ArrowRightIcon fontSize={12} /> </Button>
            </div>
          </div>
        </div>
        <div className="relative hidden">
          <figure className="w-[250px] lg:w-[360px] lg:h-[453px] z-0">
              <Image
                src="/assets/images/cleaner.png"
                alt="hero-2"
                width={360}
                height={453}
                className="object-cover block"
              />
          </figure>
        </div>
      </section>
      <section className="flex items-center justify-center px-11 pt-24 pb-32 bg-[#F4F3F5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 grid-rows-1 gap-y-6 gap-x-8">
          <div className="relative flex flex-col gap-y-6 items-center justify-center  xl:w-[296px] h-[437px]" data-aos="fade-up" data-aos-duration="1000">
            <figure className="w-full h-full">
            <Image
              src="/assets/images/chef.png"
              alt="chef"
              width={280}
              height={400}
              className="w-full h-full object-cover block"
            />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center  xl:w-[296px] h-[437px]" data-aos="fade-down" data-aos-duration="1000">
            <figure className="w-full h-full">
            <Image
              src="/assets/images/bricklayer.png"
              alt="bricklayer"
              width={280}
              height={400}
              className="w-full h-full object-cover block"
            />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center  xl:w-[296px] h-[437px]" data-aos="fade-up" data-aos-duration="1000">
            <figure className="w-full h-full">
            <Image
              src="/assets/images/electrician.png"
              alt="electrician"
              width={280}
              height={400}
              className="w-full h-full object-cover block"
            />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center  xl:w-[296px] h-[437px]" data-aos="fade-down" data-aos-duration="1000">
            <figure className="w-full h-full">
            <Image
              src="/assets/images/driver.png"
              alt="driver"
              width={280}
              height={400}
              className="w-full h-full object-cover block"
            />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
        </div>
      </section>
      <section className="bg-white items-center flex justify-center h-[100px] md:h-[250px] relative">
        <div className="flex max-w-[990px] max-h-[198px] w-full absolute -top-10">
          <div className="bg-primary-1 text-white flex justify-center gap-x-3 py-2 lg:gap-x-8 items-center flex-1">
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">500+</h1>
              <p className="md:text-base text-sm lg:text-xl">Service seekers</p>
            </div>
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">200+</h1>
              <p className="md:text-base text-sm lg:text-xl">Service providers</p>
            </div>
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">5000+</h1>
              <p className="md:text-base text-sm lg:text-xl">Transactions</p>
            </div>
          </div>

          <div className="relative hidden md:block">
            <figure className=" w-[200px] lg:w-[266px] h-[198px] z-0">
              <Image
                src="/assets/images/salesman.png"
                alt="salesman"
                width={266}
                height={198}
                className="object-cover block"
              />
            </figure>
            <div className="bg-[rgba(154,101,207,0.35)] text-xs text-white flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus rerum provident sit sed!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}