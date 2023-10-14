"use client";
import React from "react";

export default function Home() {
	return (
		<main className={"flex flex-col items-center justify-center w-full flex-1 px-20 text-center"}>
			<section id={"home"} className={"flex h-screen justify-center items-center flex-col"}>
				<h1 className={"md:text-7xl text-5xl font-bold"}>OctoCord</h1>
				{
					/*<Button className={"mt-4"} color={"primary"} href={"#features"}>
						Explore <FaArrowDown/>
					</Button>*/
				}
				<h2 className={"text-2xl font-bold mt-4"}>A multi-purpose Discord bot.</h2>
				<h3 className={"text-xl font-bold mt-4 text-grey-400"}>Coming Soon!</h3>
			</section>
		</main>
	);
}
