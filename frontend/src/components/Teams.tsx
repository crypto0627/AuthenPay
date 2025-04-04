import { teams } from '@/constants'
import styles from '@/app/style'
import TeamsCard from '@/components/TeamsCard'
import { teamTypes } from '@/types/ui.type'

export default function Teams() {
  return (
    <section
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}
    >

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2 className={styles.heading2}>Our Team</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {teams.map((card: teamTypes) => (
          <TeamsCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  )
}
