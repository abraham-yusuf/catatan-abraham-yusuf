import Link from 'next/link'
import SocialUrls from './SocialUrls'
import ThemeSwitch from '../ThemeSwitch'
import s from './Footer.module.css'

const Footer = ({ categories, pages }: TNavigation) => {
  return (
    <footer className="block bottom-0 left-0 right-0 bg-primary-05 px-6 py-6 md:px-32 lg:px-48 xl:px-1/5">
      <nav
        className="flex flex-col  mt-6 mb-6 flex-wrap md:flex-row md:justify-between"
        aria-label="Footer Nav"
      >
        <div>
          <h3 className={s.heading}>Kategori</h3>
          <ul className={s.ul}>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`}>
                  <a className={s.link}>{category.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={s.heading}>Kontributor</h3>
          <ul className={s.ul}>
            <li>
              <Link href="/contributors">
                <a className={s.link}>Penulis</a>
              </Link>
            </li>

            <li>
              <Link href="mailto:kontak.abrahamyusuf@gmail.com">
                <a className={s.link}>Email</a>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={s.heading}>Halaman Lain</h3>
          <ul className={s.ul}>
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={`/pages/${page.slug}`}>
                  <a className={s.link}>{page.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <SocialUrls />

      <ThemeSwitch />
    </footer>
  )
}

export default Footer
