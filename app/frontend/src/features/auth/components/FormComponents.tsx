import React, { InputHTMLAttributes } from "react";

// 共通の入力フィールドコンポーネント
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
    name,
    placeholder,
    value,
    onChange,
    type = "text",
    ...props
}) => {
    return (
        <div className="relative w-[70%] flex justify-between">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full outline-none border border-white/25 bg-black/25 py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50"
                {...props}
            />
        </div>
    );
};

// サブミットボタンコンポーネント
interface SubmitButtonProps {
    value: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ value }) => {
    return (
        <div className="relative w-[70%] flex justify-between">
            <input
                type="submit"
                value={value}
                className="w-full outline-none border border-white/25 bg-[#2196f3] py-[6px] px-[15px] rounded-[4px] text-[0.85em] text-white placeholder:text-white/50 font-[500] cursor-pointer"
            />
        </div>
    );
};

// フォームタイトルコンポーネント
interface FormTitleProps {
    title: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
    return (
        <h2 className="relative text-white text-[1.5em] tracking-[0.1em] uppercase font-[500] mb-[10px]">
            {title}
        </h2>
    );
};
