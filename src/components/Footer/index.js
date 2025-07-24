import style from './Footer.module.css';
import React from 'react';

export default function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <span>&copy; 2023 PobreFLix - desemvolvido por Vinicius Guimarães</span>
                <nav>
                    <a href="https://github.com/vinicius28g" target='_blank'>gitHub</a>
                    <a href="#">Terms of Service</a>
                </nav>
            </footer>
        </>
    );
}