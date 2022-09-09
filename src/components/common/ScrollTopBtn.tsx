import { useState } from 'react';
import styled from "styled-components";

const ScrollBtn = styled.button<{ visible: boolean; }>`
    all: unset;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 5%;
    right 25%;
    font-size: 3rem;
    z-index: 2;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.arrowColor};
    border-radius: 50px;
    display: ${({ visible }) => visible ? "block" : "none"}
`;


function ScrollTopBtn() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <ScrollBtn onClick={scrollToTop} visible={visible}>
            {visible &&
                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" style={{ paddingLeft: 10 }} viewBox="0 0 384 512" fill="rgb(106, 168, 79)">
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
            }
        </ScrollBtn>
    )
}

export default ScrollTopBtn;