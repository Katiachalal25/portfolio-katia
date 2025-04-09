import styles from './footer.module.css'
function Footer() {
    return (
        <footer className='footer'>
            <div className='wrapper'>
                &copy;Groupe 40
                <a className={styles['group-github-link']} href="#">Github</a>
            </div>

        </footer>
    )
}

export default Footer