"use client"
import React, { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { RecipeType } from '@/app/types/interface'
import Image from 'next/image'
type TabsProps = {
    tabs: string[],
    panels: RecipeType
}

const Tabs: React.FC<TabsProps> = ({ tabs, panels }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList className="flex gap-4 bg-orange-100 dark:bg-slate-800 rounded-t-lg">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        className={`
                        text-2xl px-2 py-1 
                        outline-none
                        data-[selected]:bg-orange-300 data-[selected]:dark:bg-slate-700 
                        ${index === 0 && "data-[selected]:rounded-tl-lg"} 
                        data-[selected]:text-white
                        `}
                    >
                        {tab}
                    </Tab>
                ))}
            </TabList>

            <TabPanels className={"border-orange-200 dark:border-slate-700 border-[1px] rounded-b-lg"}>
                {panels.RecipeIngredients.map((recipeIngredient) => (
                    <TabPanel key={recipeIngredient.id}>
                        <div className='my-3 py-3 flex flex-row gap-5 p-3'>
                            <div key={recipeIngredient.id} className='flex flex-col items-center'>
                                <Image
                                    src={recipeIngredient.ingredient.imageUrl}
                                    height={100}
                                    width={100}
                                    alt={recipeIngredient.ingredient.name}
                                    className='size-[100px] rounded-md object-fill'
                                />
                                <p>
                                    {recipeIngredient.ingredient.name}
                                </p>
                                <p>{recipeIngredient.quantity} {recipeIngredient.unit}</p>
                            </div>
                        </div>
                    </TabPanel>
                ))}

                <TabPanel className="flex flex-row">
                    {panels.RecipeTools.map((recipeTool) => (
                        <div className='my-3 py-3 flex flex-row gap-5 p-3' key={recipeTool.id}>
                            <div key={recipeTool.id} className="flex flex-col items-center">
                                <Image
                                    src={recipeTool.tool.imageUrl}
                                    height={100}
                                    width={100}
                                    alt={recipeTool.tool.name}
                                    className='size-[100px] rounded-md object-fill'
                                />
                                <p>{recipeTool.tool.name}</p>
                            </div>
                        </div>
                    ))}
                </TabPanel>

            </TabPanels>
        </TabGroup>
    )
}

export default Tabs