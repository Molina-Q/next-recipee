"use client"
import { ChevronUp, Moon, SunDim } from 'lucide-react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setTheme(storedTheme);
        }
    }, []);

    const { currentTheme } = useCurrentTheme(theme);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChangeTheme = () => {
        const theme = localStorage.theme;

        if (!theme && !document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem("theme", "dark");

        } else if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem("theme", "light")

        } else if (!document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
        }
    }

    const removeTheme = () => {
        localStorage.removeItem("theme");
    }

    return (
        <nav className='flex justify-center gap-5 bg-orange-100 dark:bg-slate-800 py-2 mb-3'>
            <Link href='/'>
                <p>Home</p>
            </Link>

            <div className="relative cursor-pointer">
                <div onClick={toggleDropdown} className='flex flex-row items-center'>
                    <p>Forms</p>
                    <div className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronUp />
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <Link href='/recipes/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create recipe</p>
                        </Link>
                        <Link href='/ingredients/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create ingredient</p>
                        </Link>
                        <Link href='/tools/create'>
                            <p className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create tool</p>
                        </Link>
                    </div>
                )}
            </div>



            <button onClick={handleChangeTheme}>
                {currentTheme === "dark" ? <SunDim /> : <Moon />}
            </button>

            {/* <button onClick={removeTheme}>remove theme</button> */}

        </nav>
    )
}

export default Topbar

const useCurrentTheme = (theme: string) => {
    const [currentTheme, setCurrentTheme] = useState<string>();

    useEffect(() => {
        if (!theme) {
            setCurrentTheme('dark');
        } else {
            setCurrentTheme(theme);
        }
    }, [theme])

    return { currentTheme }
}