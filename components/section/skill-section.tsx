import Section from "./section";

export default function SkillSection() {
  // const skills = [
  //   {
  //     title: "Full Stack Development",
  //     description: "Proficient in building web applications using Next.js, ReactJS, and Bootstrap.",
  //   },
  //   {
  //     description: "Expertise in utilizing browser console for effective debugging and troubleshooting.",
  //   },
  //   {
  //     description: "Hands-on experience with AWS services such as Amplify and Lambda for deployment and hosting.",
  //   },
  //   {
  //     title: "Machine/Deep Learning",
  //     description: "Comfortable working with CUDA and PyTorch.",
  //   },
  //   {
  //     description: "Familiar with visualization tools like Matplotlib and Open3D.",
  //   },
  //   {
  //     title: "Others",
  //     description: "Basic understanding of Databases, Big Data Computing/Storage, Parallel/Distributed Systems, Computer Networks, and Cybersecurity.",
  //   },
  //   {
  //     title: "Tools",
  //     description: "Skilled in VS Code, Git, Markdown, and LaTex.",
  //   },
  // ];

  const skills = [
    {
      title: "Full Stack Development",
      description: "Next.js, ReactJS, and Bootstrap for building web applications."
    },
    {
      description: "AWS (Amplify, Lambda) for deployment and hosting."
    },
    {
      title: "Machine/Deep Learning",
      description: "CUDA and PyTorch for construction and optimization.",
    },
    {
      description: "Matplotlib and Open3D for visualization.",
    },
    {
      title: "Others",
      description: "Databases, Big Data Computing/Storage, Parallel/Distributed Systems, Computer Networks, and Cybersecurity.",
    },
    {
      title: "Tools",
      description: "VS Code, Git, Docker, Markdown, and LaTex.",
    },
  ]

  return (
    <Section title="SKILLS">
      {skills.map((skill, index) => (
        <div key={index} className="md:flex text-sm">
          <div className="w-48 flex-shrink-0 flex justify-between">
            {skill.title && <><span className="font-bold">{skill.title}</span>:</>}
          </div>
          <div className="md:ml-8 text-zinc-700 dark:text-zinc-300">
            {skill.description}
          </div>
        </div>
      ))}
    </Section>
  );
}

