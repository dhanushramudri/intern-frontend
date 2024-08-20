import React, { useRef } from "react";
import styles from "./styles.module.css";
import stars from "./stars.svg";
import user1 from "./user1.svg";
import user2 from "./user2.png";
import user3 from "./user3.svg";
import { useInView, motion } from "framer-motion";

export default function Testimonials() {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const fadeElements = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.testimonials_container}>
      <div className={styles.testimonials_title}>
        🤵🏻 ‍What our users are saying
      </div>
      <div className={styles.testimonials_subtitle}>
        Not convinced? Join the hundreds of satisfied people who use Inten to
        save time and get hired faster.{" "}
      </div>
      <div ref={ref} className={styles.testimonials_cards} id="testimonials">
        {/* Testimonial1 */}
        <motion.div
          className={styles.testimonials_card}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeElements}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img alt="rating" src={stars} className={styles.stars} />
          <div className={styles.testimonial}>
            Excellent tool for a succesful job hunt. Intern.ai streamlines the
            process by filtering out most scam and outdated postings. I'm a fan
            of the interface and email alerts. It felt like it provided me an
            edge by being among the early applicants.
          </div>
          <div className={styles.testimonial_user}>
            <img
              alt="user_profile"
              src={user1}
              className={styles.testimonial_user_img}
            />
            <div className={styles.user_details}>
              <div className={styles.user_name}>Sandra Wellins</div>
              <div className={styles.user_role}>Technical Recruiter</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial2 */}

        <motion.div
          className={styles.testimonials_card}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeElements}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <img alt="rating" src={stars} className={styles.stars} />
          <div className={styles.testimonial}>
            Intern.ai stands out as a guiding light for those wanting to cut
            through the clutter on LinkedIn and other sites, zeroing in on the
            right roles!
          </div>
          <div className={styles.testimonial_user}>
            <img
              alt="user_profile"
              src={user2}
              className={styles.testimonial_user_img}
            />
            <div className={styles.user_details}>
              <div className={styles.user_name}>Walid Ferjani</div>
              <div className={styles.user_role}>SEO Specialist</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial3 */}
        <motion.div
          className={styles.testimonials_card}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeElements}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <img alt="rating" src={stars} className={styles.stars} />
          <div className={styles.testimonial}>
            I applied to 500 jobs in 3 months without a single interview. Then I
            came across Intern.ai, and within a week, I landed 3 interviews! I'm
            particularly fond of the site's layout and the direct links to
            company websites.I recommend Intern.ai to everyone!
          </div>
          <div className={styles.testimonial_user}>
            <img
              alt="user_profile"
              src={user3}
              className={styles.testimonial_user_img}
            />
            <div className={styles.user_details}>
              <div className={styles.user_name}>Anthony Contreras</div>
              <div className={styles.user_role}>Software Engineer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
