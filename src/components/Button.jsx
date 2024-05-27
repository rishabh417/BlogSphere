import React from "react";

export default function Button({
    children,
    type="button",
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className = "",
    props
}){
    return(
        <button className={`px-4 py-2 rouded-lg ${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </button>
    )
}