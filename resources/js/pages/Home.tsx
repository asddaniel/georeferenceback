import Globe from "../components/Globe"
import { Card } from "@nextui-org/react"
import React from "react"

export default function Home(){


    return <div className="p-2 bg-gray-200">
        <h1>Home</h1>
        <Card className="p-3 shadow-lg rounded-lg bg-gray-800 flex justify-center items-center mb-5 h-full">
        <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden min-h-[35rem] rounded-lg border bg-background px-40 pb-40 pt-3 md:pb-60 md:shadow-xl">
      <span className="pointer-events-none -translate-y-32 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28 bg-gray-900" />
      <div className="pointer-events-none absolute inset-0 h-full w-64 bg-[radial-gradient(circle_at_50%_200%,rgba(0,8,100,0.3),rgba(255,255,255,0))]" />
    </div>
    <div className="w-full p-3 flex justify-center">
      <a href="/login" className="rounded bg-white text-gray-800 font-bold p-2">se Connecter</a>
    </div>
        </Card>
    </div>
}