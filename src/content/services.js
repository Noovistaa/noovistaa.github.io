// ─────────────────────────────────────────────────────────────
//  SERVICES: used by the Services page and the "What we do" cards on Home.
//
//  Services are grouped into Hardware, Software and AI.
//  To add a service: copy one { slug: ... } block inside a group and edit it.
//    slug         short unique id used in the link, lowercase-with-dashes
//    icon         one of the names listed in src/components/ui/Icon.jsx
//    animation    the moving banner at the top of the popup. One of: electronics, pcb,
//                 embedded, signal, code, apps, iot, neural, vision, drone
//                 (leave it out to show the icon instead)
//    summary      one line, shown in the list
//    description  a short paragraph, shown in the popup
//    whatWeDo     bullet points, shown in the popup
//    deliverables what the client receives, shown in the popup
// ─────────────────────────────────────────────────────────────

export const servicesHeader = {
  eyebrow: 'Services',
  title: 'Everything your product needs, under one roof.',
  subtitle:
    'Software, hardware and AI services, from the first idea to a finished product. Click any service to see what’s included.',
}

export const serviceGroups = [
  {
    id: 'hardware',
    name: 'Hardware',
    icon: 'CircuitBoard',
    intro: 'Electronics designed for the real world, from the first schematic to production-ready boards.',
    services: [
      {
        slug: 'electronic-design',
        animation: 'electronics',
        icon: 'Microchip',
        title: 'Electronic Design & Development',
        summary: 'Custom electronics designed around your product, from concept to working prototype.',
        description:
          'We design the electronics at the heart of your product: choosing the right components, designing reliable circuits and turning them into prototypes you can test, demo and take to production.',
        whatWeDo: [
          'Requirements and system architecture',
          'Circuit and schematic design',
          'Component selection and sourcing',
          'Power supply and battery design',
          'Sensor and motor interfacing',
          'Prototype bring-up and testing',
        ],
        deliverables: ['Schematics', 'Bill of materials', 'Working prototypes', 'Test reports'],
      },
      {
        slug: 'pcb-design',
        animation: 'pcb',
        icon: 'CircuitBoard',
        title: 'PCB Design',
        summary: 'Multi-layer circuit boards that are reliable, compact and ready to manufacture.',
        description:
          'Our PCB designs are built for performance and for the factory: clean layouts, solid signal and power integrity, and files a manufacturer can build right the first time.',
        whatWeDo: [
          'Single and multi-layer PCB layout',
          'High-speed and mixed-signal routing',
          'Signal and power integrity checks',
          'Design for manufacturing and assembly',
          'Enclosure and mechanical fit',
          'Manufacturing files and assembly support',
        ],
        deliverables: ['PCB layout files', 'Gerber and drill files', 'Assembly drawings', 'Manufactured boards'],
      },
      {
        slug: 'embedded-systems',
        animation: 'embedded',
        icon: 'Cpu',
        title: 'Embedded Systems',
        summary: 'Firmware that makes your hardware fast, efficient and dependable.',
        description:
          'We write the software that runs on your device, from bare-metal firmware to embedded Linux, with a focus on reliability, real-time performance and low power use.',
        whatWeDo: [
          'Microcontroller firmware',
          'Real-time operating systems',
          'Embedded Linux',
          'Device drivers and sensor integration',
          'Communication protocols (UART, SPI, I²C, CAN, USB)',
          'Bootloaders and over-the-air updates',
        ],
        deliverables: ['Documented source code', 'Firmware builds', 'Flashing and test tools', 'Technical documentation'],
      },
      {
        slug: 'signal-processing',
        animation: 'signal',
        icon: 'AudioWaveform',
        title: 'Digital Signal Processing',
        summary: 'Turning raw signals into clean, useful data in real time.',
        description:
          'From audio and sensor data to radio signals, we design algorithms that filter, analyse and make sense of signals, and implement them to run in real time on your hardware.',
        whatWeDo: [
          'Filtering and noise reduction',
          'Spectrum and frequency analysis',
          'Sensor fusion',
          'Audio and communication signal processing',
          'Real-time implementation on embedded hardware',
          'Algorithm prototyping and validation',
        ],
        deliverables: ['Algorithm designs', 'Real-time implementations', 'Validation results'],
      },
    ],
  },
  {
    id: 'software',
    name: 'Software',
    icon: 'CodeXml',
    intro: 'Software that is secure, scalable and easy to use, on the web, on phones and in the cloud.',
    services: [
      {
        slug: 'software-solutions',
        animation: 'code',
        icon: 'CodeXml',
        title: 'Software Solutions',
        summary: 'Custom software built around the way your business works.',
        description:
          'We build custom software that streamlines operations and solves real problems, from internal tools and dashboards to complete platforms.',
        whatWeDo: [
          'Custom business software',
          'Dashboards and admin panels',
          'APIs and system integrations',
          'Databases and data pipelines',
          'Automation of manual work',
          'Maintenance and support',
        ],
        deliverables: ['Production-ready software', 'Source code and documentation', 'Deployment and handover'],
      },
      {
        slug: 'web-mobile-apps',
        animation: 'apps',
        icon: 'Smartphone',
        title: 'Web & Mobile Applications',
        summary: 'Fast, modern web and mobile apps your users will enjoy.',
        description:
          'We design and build web and mobile apps with clean interfaces and solid engineering underneath, from the first prototype to launch.',
        whatWeDo: [
          'Web applications',
          'iOS and Android apps',
          'UI and UX design',
          'Companion apps for hardware devices',
          'Accounts, payments and notifications',
          'Performance and security',
        ],
        deliverables: ['Designs and prototypes', 'Web and mobile apps', 'App store launch'],
      },
      {
        slug: 'iot-cloud',
        animation: 'iot',
        icon: 'Cloud',
        title: 'IoT & Cloud Platforms',
        summary: 'Connecting your devices to the cloud, securely and at scale.',
        description:
          'We connect hardware to the internet and build the cloud platforms that collect, store and act on device data, so you can monitor and update your devices from anywhere.',
        whatWeDo: [
          'Device connectivity (Wi-Fi, Bluetooth, cellular, LoRa)',
          'Cloud backends and device management',
          'Real-time monitoring dashboards',
          'Over-the-air update systems',
          'Security and access control',
          'Cloud and DevOps setup',
        ],
        deliverables: ['Cloud platform', 'Device dashboards', 'Deployment pipelines'],
      },
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: 'BrainCircuit',
    intro: 'Practical AI that solves real problems, in the cloud or running on the device itself.',
    services: [
      {
        slug: 'ai-machine-learning',
        animation: 'neural',
        icon: 'BrainCircuit',
        title: 'AI & Machine Learning',
        summary: 'Custom AI models and features that turn your data into results.',
        description:
          'We build machine learning solutions end to end: understanding the problem, preparing the data, training models and putting them into production where they deliver value.',
        whatWeDo: [
          'Data collection and preparation',
          'Custom model training',
          'Prediction and classification systems',
          'AI assistants and LLM-powered features',
          'Model deployment and monitoring',
          'On-device (edge) AI',
        ],
        deliverables: ['Trained models', 'AI-powered features', 'Evaluation reports'],
      },
      {
        slug: 'computer-vision',
        animation: 'vision',
        icon: 'ScanEye',
        title: 'Computer Vision',
        summary: 'Systems that see, detect and measure, from camera to insight.',
        description:
          'We build vision systems that detect objects, inspect products, read text and track movement, using cameras and models tuned for your environment.',
        whatWeDo: [
          'Object detection and tracking',
          'Visual inspection and quality control',
          'Image classification and segmentation',
          'Text recognition (OCR)',
          'Camera and sensor selection',
          'Real-time video processing',
        ],
        deliverables: ['Vision models', 'Camera systems', 'Integration into your product'],
      },
      {
        slug: 'robotics-drones',
        animation: 'drone',
        icon: 'Drone',
        title: 'Robotics & Drone Systems',
        summary: 'Control systems that make drones and robots move precisely and reliably.',
        description:
          'We combine hardware, embedded control and intelligent software to build drones and robots that move precisely, stay stable and respond reliably.',
        whatWeDo: [
          'Flight and motion control',
          'Sensor fusion and stabilisation',
          'Motor control',
          'Navigation and path planning',
          'Ground control software',
          'Testing and tuning',
        ],
        deliverables: ['Control firmware', 'Ground control software', 'Tested prototypes'],
      },
    ],
  },
]

// Every service in one list (used for the "next service" button in the popup).
export const allServices = serviceGroups.flatMap((group) =>
  group.services.map((service) => ({ ...service, group: group.name, groupId: group.id }))
)
