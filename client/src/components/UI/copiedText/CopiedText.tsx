import React, { useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';

const CopiedText: React.FC<any> = ({text}) => {
    const [copied, setCopied] = useState(false)

    const clipboard = useClipboard()

    const copy = (text: string) => {
        clipboard.copy(text)
        setCopied(true)
        setTimeout(() => { setCopied(false) }, 500)
    }

    return (
        <div>
            {
                copied ?
                <p>Скопировано!</p>
                :
                <p className='cursor-pointer hover:underline decoration-dashed select-none' onClick={() => copy(text)}>{text}</p>
            }
        </div>
    );
};

export default CopiedText;