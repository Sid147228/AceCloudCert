import type { Option, Question } from '@/types';

export const AWS_CCP_CERTIFICATION_ID = 'aws-ccp';

export const AWS_CCP_DOMAINS = [
  'Cloud concepts',
  'Security and compliance',
  'Technology',
  'Billing and pricing',
  'Global infrastructure',
  'Compute',
  'Storage',
  'Networking',
  'Databases',
  'Support plans'
] as const;

const CONTENT_TIMESTAMP = '2026-05-14T00:00:00.000Z';
const OPTION_IDS = ['a', 'b', 'c', 'd'] as const;

type QuestionSeed = Omit<Question, 'certificationId' | 'options' | 'createdAt' | 'updatedAt'> & {
  options: readonly [string, string, string, string];
};

function buildOptions(values: readonly [string, string, string, string]): readonly Option[] {
  return [
    { id: OPTION_IDS[0], text: values[0] },
    { id: OPTION_IDS[1], text: values[1] },
    { id: OPTION_IDS[2], text: values[2] },
    { id: OPTION_IDS[3], text: values[3] }
  ];
}

function q(seed: QuestionSeed): Question {
  const { options, ...question } = seed;

  return {
    ...question,
    certificationId: AWS_CCP_CERTIFICATION_ID,
    options: buildOptions(options),
    createdAt: CONTENT_TIMESTAMP,
    updatedAt: CONTENT_TIMESTAMP
  };
}

export const questionBank: readonly Question[] = [
  q({
    id: 'aws-ccp-cloud-concepts-001',
    domain: 'Cloud concepts',
    subDomain: 'Cloud value proposition',
    difficulty: 'easy',
    questionText: 'Which statement best describes cloud computing?',
    options: [
      'Purchasing dedicated hardware for a private data center',
      'On-demand delivery of IT resources over the internet with pay-as-you-go pricing',
      'Installing software only on company-owned laptops',
      'Signing a fixed contract for a single physical server'
    ],
    correctOptionId: 'b',
    explanation:
      'Cloud computing provides on-demand access to compute, storage, databases, and other IT resources over the internet. Customers typically pay only for what they use instead of making large upfront investments.',
    reference: 'AWS Cloud Practitioner Essentials - Introduction to AWS Cloud',
    tags: ['cloud basics', 'pay as you go', 'value proposition'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-cloud-concepts-002',
    domain: 'Cloud concepts',
    subDomain: 'Cloud economics',
    difficulty: 'easy',
    questionText: 'Which cloud benefit helps customers replace large upfront capital expenses with variable operating expenses?',
    options: ['Elasticity', 'Pay-as-you-go pricing', 'High availability', 'Global DNS routing'],
    correctOptionId: 'b',
    explanation:
      'The AWS Cloud lets customers trade capital expense for variable expense. Instead of buying hardware before it is needed, organizations pay for resources as they consume them.',
    reference: 'AWS Cloud Economics Center - Cost savings',
    tags: ['cost optimization', 'opex', 'pricing'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-cloud-concepts-003',
    domain: 'Cloud concepts',
    subDomain: 'Scalability and elasticity',
    difficulty: 'medium',
    questionText: 'A retail application needs to add capacity during a holiday sale and reduce capacity after traffic returns to normal. Which cloud concept does this illustrate?',
    options: ['Durability', 'Elasticity', 'Data sovereignty', 'Fault isolation'],
    correctOptionId: 'b',
    explanation:
      'Elasticity is the ability to scale resources up or down as demand changes. It helps avoid over-provisioning while still supporting spikes in traffic.',
    reference: 'AWS Well-Architected Framework - Reliability Pillar',
    tags: ['elasticity', 'scaling', 'reliability'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-cloud-concepts-004',
    domain: 'Cloud concepts',
    subDomain: 'Cloud service models',
    difficulty: 'medium',
    questionText: 'In an Infrastructure as a Service model, which responsibility usually remains with the customer?',
    options: [
      'Maintaining the physical data center',
      'Replacing failed server hardware',
      'Managing the guest operating system and application configuration',
      'Operating the global network backbone'
    ],
    correctOptionId: 'c',
    explanation:
      'With IaaS services such as Amazon EC2, AWS manages the physical infrastructure while customers manage the guest operating system, installed software, and application configuration.',
    reference: 'AWS Shared Responsibility Model',
    tags: ['iaas', 'shared responsibility', 'operations'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-cloud-concepts-005',
    domain: 'Cloud concepts',
    subDomain: 'Design principles',
    difficulty: 'medium',
    questionText: 'Which AWS Cloud design principle encourages teams to use managed services instead of spending time operating common infrastructure?',
    options: [
      'Stop guessing capacity',
      'Go global in minutes',
      'Stop spending money on undifferentiated heavy lifting',
      'Use manual change approvals for every deployment'
    ],
    correctOptionId: 'c',
    explanation:
      'Managed AWS services reduce the operational work of running common infrastructure. Teams can focus more energy on business value instead of undifferentiated heavy lifting.',
    reference: 'AWS Overview - Six Advantages of Cloud Computing',
    tags: ['managed services', 'operational excellence', 'cloud value'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-cloud-concepts-006',
    domain: 'Cloud concepts',
    subDomain: 'Availability concepts',
    difficulty: 'hard',
    questionText: 'A workload is designed to continue operating when one data center fails. Which cloud architecture goal is being addressed?',
    options: ['Least privilege', 'High availability', 'Loose coupling', 'Version control'],
    correctOptionId: 'b',
    explanation:
      'High availability focuses on keeping systems operational despite component failures. In AWS, this often means designing across multiple Availability Zones.',
    reference: 'AWS Well-Architected Framework - Reliability Pillar',
    tags: ['high availability', 'fault tolerance', 'architecture'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-security-compliance-001',
    domain: 'Security and compliance',
    subDomain: 'Shared responsibility model',
    difficulty: 'easy',
    questionText: 'Under the AWS shared responsibility model, which responsibility belongs to AWS?',
    options: [
      'Creating IAM users for customer employees',
      'Patching customer application code',
      'Protecting the physical infrastructure that runs AWS services',
      'Choosing customer password rotation policies'
    ],
    correctOptionId: 'c',
    explanation:
      'AWS is responsible for security of the cloud, including the facilities, hardware, networking, and infrastructure used to run AWS services.',
    reference: 'AWS Shared Responsibility Model',
    tags: ['shared responsibility', 'security of the cloud'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-security-compliance-002',
    domain: 'Security and compliance',
    subDomain: 'Identity and access management',
    difficulty: 'easy',
    questionText: 'Which AWS service is used to manage users, groups, roles, and permissions?',
    options: ['AWS IAM', 'AWS CloudTrail', 'Amazon GuardDuty', 'AWS Config'],
    correctOptionId: 'a',
    explanation:
      'AWS Identity and Access Management, or IAM, is the core service for controlling access to AWS services and resources.',
    reference: 'AWS IAM User Guide - What is IAM?',
    tags: ['iam', 'permissions', 'identity'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-security-compliance-003',
    domain: 'Security and compliance',
    subDomain: 'Account protection',
    difficulty: 'easy',
    questionText: 'What is the primary purpose of enabling multi-factor authentication on an AWS account?',
    options: [
      'To encrypt all data stored in Amazon S3 automatically',
      'To add an additional verification factor during sign-in',
      'To replace IAM policies with network firewalls',
      'To create monthly cost allocation reports'
    ],
    correctOptionId: 'b',
    explanation:
      'MFA adds a second authentication factor beyond a password, reducing the risk of unauthorized access if credentials are compromised.',
    reference: 'AWS IAM User Guide - Using multi-factor authentication',
    tags: ['mfa', 'account security', 'authentication'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-security-compliance-004',
    domain: 'Security and compliance',
    subDomain: 'Least privilege',
    difficulty: 'medium',
    questionText: 'A developer should only be able to read objects from one specific S3 bucket. Which security practice does this requirement follow?',
    options: ['Full administrator access', 'Least privilege', 'Public access by default', 'Implicit allow'],
    correctOptionId: 'b',
    explanation:
      'Least privilege means granting only the permissions required to perform a task. This reduces the impact of mistakes or compromised credentials.',
    reference: 'AWS IAM User Guide - Security best practices in IAM',
    tags: ['least privilege', 'iam policies', 's3'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-security-compliance-005',
    domain: 'Security and compliance',
    subDomain: 'Compliance resources',
    difficulty: 'medium',
    questionText: 'Which AWS service provides on-demand access to AWS compliance reports and select online agreements?',
    options: ['AWS Artifact', 'AWS Shield', 'AWS CloudFormation', 'Amazon Inspector'],
    correctOptionId: 'a',
    explanation:
      'AWS Artifact is the central resource for compliance-related documents such as SOC reports, PCI reports, and certain agreements.',
    reference: 'AWS Artifact - Compliance reports',
    tags: ['compliance', 'artifact', 'reports'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-security-compliance-006',
    domain: 'Security and compliance',
    subDomain: 'Encryption and key management',
    difficulty: 'hard',
    questionText: 'Which AWS service helps create and control cryptographic keys used to protect data?',
    options: ['AWS KMS', 'Amazon Route 53', 'AWS Organizations', 'Amazon CloudFront'],
    correctOptionId: 'a',
    explanation:
      'AWS Key Management Service helps customers create, manage, rotate, and control access to cryptographic keys used by AWS services and applications.',
    reference: 'AWS Key Management Service Developer Guide',
    tags: ['kms', 'encryption', 'key management'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-technology-001',
    domain: 'Technology',
    subDomain: 'Monitoring and observability',
    difficulty: 'easy',
    questionText: 'Which AWS service collects metrics, logs, and alarms for AWS resources and applications?',
    options: ['Amazon CloudWatch', 'AWS Artifact', 'Amazon Athena', 'AWS Snowball'],
    correctOptionId: 'a',
    explanation:
      'Amazon CloudWatch provides monitoring and observability capabilities including metrics, logs, dashboards, and alarms.',
    reference: 'Amazon CloudWatch User Guide',
    tags: ['cloudwatch', 'monitoring', 'logs'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-technology-002',
    domain: 'Technology',
    subDomain: 'Infrastructure as code',
    difficulty: 'medium',
    questionText: 'Which AWS service lets teams define and provision infrastructure using templates?',
    options: ['AWS CloudFormation', 'Amazon Rekognition', 'AWS WAF', 'Amazon QuickSight'],
    correctOptionId: 'a',
    explanation:
      'AWS CloudFormation enables infrastructure as code by provisioning AWS resources from declarative templates.',
    reference: 'AWS CloudFormation User Guide',
    tags: ['cloudformation', 'infrastructure as code', 'automation'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-technology-003',
    domain: 'Technology',
    subDomain: 'Messaging and integration',
    difficulty: 'medium',
    questionText: 'Which AWS service provides publish and subscribe messaging for application-to-application notifications?',
    options: ['Amazon SNS', 'Amazon EBS', 'AWS IAM', 'Amazon Redshift'],
    correctOptionId: 'a',
    explanation:
      'Amazon Simple Notification Service supports pub/sub messaging and fanout patterns for distributing notifications to multiple subscribers.',
    reference: 'Amazon Simple Notification Service Developer Guide',
    tags: ['sns', 'pubsub', 'messaging'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-technology-004',
    domain: 'Technology',
    subDomain: 'Application decoupling',
    difficulty: 'medium',
    questionText: 'Which AWS service uses message queues to decouple application components?',
    options: ['Amazon SQS', 'AWS Organizations', 'Amazon Route 53', 'AWS Direct Connect'],
    correctOptionId: 'a',
    explanation:
      'Amazon Simple Queue Service stores messages in queues so producers and consumers can operate independently and tolerate traffic spikes.',
    reference: 'Amazon Simple Queue Service Developer Guide',
    tags: ['sqs', 'decoupling', 'queues'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-technology-005',
    domain: 'Technology',
    subDomain: 'Optimization guidance',
    difficulty: 'medium',
    questionText: 'Which AWS service provides recommendations to improve cost optimization, security, performance, and fault tolerance?',
    options: ['AWS Trusted Advisor', 'AWS CloudTrail', 'Amazon Polly', 'AWS Glue'],
    correctOptionId: 'a',
    explanation:
      'AWS Trusted Advisor inspects an AWS environment and provides best-practice recommendations across several operational categories.',
    reference: 'AWS Trusted Advisor',
    tags: ['trusted advisor', 'best practices', 'optimization'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-technology-006',
    domain: 'Technology',
    subDomain: 'Developer tools',
    difficulty: 'hard',
    questionText: 'A team wants to manage AWS resources from scripts and terminal commands. Which tool is designed for this use case?',
    options: ['AWS CLI', 'AWS Artifact', 'AWS Cost Explorer', 'Amazon Macie'],
    correctOptionId: 'a',
    explanation:
      'The AWS Command Line Interface lets users manage AWS services from a terminal and automate operational tasks with scripts.',
    reference: 'AWS Command Line Interface User Guide',
    tags: ['aws cli', 'automation', 'developer tools'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-billing-pricing-001',
    domain: 'Billing and pricing',
    subDomain: 'Budgeting',
    difficulty: 'easy',
    questionText: 'Which AWS tool can send alerts when actual or forecasted spend exceeds a defined threshold?',
    options: ['AWS Budgets', 'AWS CloudTrail', 'Amazon VPC', 'AWS Shield Advanced'],
    correctOptionId: 'a',
    explanation:
      'AWS Budgets lets customers set custom cost and usage thresholds and receive alerts when spending approaches or exceeds those thresholds.',
    reference: 'AWS Billing and Cost Management - AWS Budgets',
    tags: ['budgets', 'cost control', 'alerts'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-billing-pricing-002',
    domain: 'Billing and pricing',
    subDomain: 'Cost analysis',
    difficulty: 'easy',
    questionText: 'Which AWS service helps visualize historical costs and usage trends?',
    options: ['AWS Cost Explorer', 'AWS Secrets Manager', 'Amazon S3 Glacier', 'Amazon EKS'],
    correctOptionId: 'a',
    explanation:
      'AWS Cost Explorer provides reports, charts, and filtering tools for analyzing AWS costs and usage over time.',
    reference: 'AWS Billing and Cost Management - Cost Explorer',
    tags: ['cost explorer', 'usage analysis', 'billing'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-billing-pricing-003',
    domain: 'Billing and pricing',
    subDomain: 'Cost estimation',
    difficulty: 'easy',
    questionText: 'Which AWS tool helps estimate monthly costs before deploying a workload?',
    options: ['AWS Pricing Calculator', 'AWS Config', 'Amazon Inspector', 'AWS Lake Formation'],
    correctOptionId: 'a',
    explanation:
      'AWS Pricing Calculator helps estimate service costs by modeling expected usage before an application is deployed.',
    reference: 'AWS Pricing Calculator',
    tags: ['pricing calculator', 'estimation', 'planning'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-billing-pricing-004',
    domain: 'Billing and pricing',
    subDomain: 'Discount models',
    difficulty: 'medium',
    questionText: 'Which pricing model can reduce compute costs when a customer commits to a consistent amount of usage for one or three years?',
    options: ['On-Demand pricing only', 'Savings Plans', 'Data transfer acceleration', 'AWS Free Tier credits only'],
    correctOptionId: 'b',
    explanation:
      'Savings Plans offer lower prices in exchange for a commitment to a consistent amount of compute usage for a one-year or three-year term.',
    reference: 'AWS Savings Plans User Guide',
    tags: ['savings plans', 'discounts', 'commitment'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-billing-pricing-005',
    domain: 'Billing and pricing',
    subDomain: 'Account management',
    difficulty: 'medium',
    questionText: 'A company wants one bill for multiple AWS accounts and centralized cost visibility. Which AWS service supports this requirement?',
    options: ['AWS Organizations', 'AWS Lambda', 'Amazon CloudFront', 'AWS Certificate Manager'],
    correctOptionId: 'a',
    explanation:
      'AWS Organizations supports consolidated billing, allowing multiple linked accounts to roll up under a single management account for billing and cost visibility.',
    reference: 'AWS Organizations User Guide - Consolidated billing',
    tags: ['organizations', 'consolidated billing', 'multi-account'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-billing-pricing-006',
    domain: 'Billing and pricing',
    subDomain: 'Free Tier',
    difficulty: 'hard',
    questionText: 'Which statement about the AWS Free Tier is most accurate?',
    options: [
      'It permanently makes all AWS services free for new accounts',
      'It includes selected offers that may be free trials, 12-month free usage, or always-free usage limits',
      'It removes all data transfer charges for production applications',
      'It is available only to Enterprise Support customers'
    ],
    correctOptionId: 'b',
    explanation:
      'The AWS Free Tier includes different offer types, such as limited free trials, 12-month offers for new accounts, and always-free usage limits for selected services.',
    reference: 'AWS Free Tier',
    tags: ['free tier', 'pricing', 'account setup'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-global-infrastructure-001',
    domain: 'Global infrastructure',
    subDomain: 'Regions',
    difficulty: 'easy',
    questionText: 'What is an AWS Region?',
    options: [
      'A physical server rack inside a data center',
      'A geographic area containing multiple isolated Availability Zones',
      'A customer billing alarm',
      'A single edge cache location'
    ],
    correctOptionId: 'b',
    explanation:
      'An AWS Region is a separate geographic area. Each Region contains multiple isolated Availability Zones for resilient workload design.',
    reference: 'AWS Global Infrastructure - Regions and Availability Zones',
    tags: ['regions', 'global infrastructure', 'geography'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-global-infrastructure-002',
    domain: 'Global infrastructure',
    subDomain: 'Availability Zones',
    difficulty: 'easy',
    questionText: 'What is an AWS Availability Zone?',
    options: [
      'A pricing tier for long-term compute commitments',
      'One or more discrete data centers with redundant power, networking, and connectivity',
      'A managed database engine',
      'A global identity provider'
    ],
    correctOptionId: 'b',
    explanation:
      'Availability Zones are isolated locations inside a Region. They are engineered with independent power, networking, and connectivity.',
    reference: 'AWS Global Infrastructure - Availability Zones',
    tags: ['availability zones', 'resilience', 'infrastructure'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-global-infrastructure-003',
    domain: 'Global infrastructure',
    subDomain: 'Edge locations',
    difficulty: 'medium',
    questionText: 'Which global infrastructure component is used by Amazon CloudFront to cache content closer to users?',
    options: ['Edge locations', 'NAT gateways', 'IAM roles', 'Placement groups'],
    correctOptionId: 'a',
    explanation:
      'CloudFront uses edge locations to cache copies of content closer to viewers, improving latency for global users.',
    reference: 'Amazon CloudFront Developer Guide - Edge locations',
    tags: ['cloudfront', 'edge locations', 'latency'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-global-infrastructure-004',
    domain: 'Global infrastructure',
    subDomain: 'Region selection',
    difficulty: 'medium',
    questionText: 'Which factor commonly influences the choice of an AWS Region for a regulated workload?',
    options: ['Data residency requirements', 'The color of the AWS console theme', 'IAM user names', 'S3 bucket object count only'],
    correctOptionId: 'a',
    explanation:
      'Region choice is often influenced by latency, service availability, cost, and compliance requirements such as where data is allowed to reside.',
    reference: 'AWS Global Infrastructure - Choosing a Region',
    tags: ['region selection', 'compliance', 'data residency'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-global-infrastructure-005',
    domain: 'Global infrastructure',
    subDomain: 'Resilient design',
    difficulty: 'medium',
    questionText: 'Why should a highly available application use multiple Availability Zones?',
    options: [
      'To avoid creating IAM roles',
      'To reduce dependency on a single isolated data center location',
      'To make every service free of charge',
      'To remove the need for backups'
    ],
    correctOptionId: 'b',
    explanation:
      'Using multiple Availability Zones helps workloads continue running if one isolated location experiences an issue.',
    reference: 'AWS Well-Architected Framework - Reliability Pillar',
    tags: ['multi-az', 'high availability', 'resilience'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-global-infrastructure-006',
    domain: 'Global infrastructure',
    subDomain: 'Local Zones',
    difficulty: 'hard',
    questionText: 'Which AWS infrastructure option places compute, storage, database, and other services closer to large population or industry centers for very low latency?',
    options: ['AWS Local Zones', 'AWS Artifact', 'AWS Budgets', 'Amazon S3 Glacier Deep Archive'],
    correctOptionId: 'a',
    explanation:
      'AWS Local Zones extend AWS infrastructure closer to users in selected metropolitan areas for latency-sensitive workloads.',
    reference: 'AWS Local Zones',
    tags: ['local zones', 'low latency', 'global infrastructure'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-compute-001',
    domain: 'Compute',
    subDomain: 'Virtual machines',
    difficulty: 'easy',
    questionText: 'Which AWS service provides resizable virtual servers in the cloud?',
    options: ['Amazon EC2', 'Amazon S3', 'AWS IAM', 'Amazon Route 53'],
    correctOptionId: 'a',
    explanation:
      'Amazon Elastic Compute Cloud provides virtual server instances that customers can launch, configure, scale, and manage.',
    reference: 'Amazon EC2 User Guide',
    tags: ['ec2', 'virtual machines', 'compute'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-compute-002',
    domain: 'Compute',
    subDomain: 'Serverless compute',
    difficulty: 'easy',
    questionText: 'Which AWS service runs code without requiring customers to provision or manage servers?',
    options: ['AWS Lambda', 'Amazon EC2 Dedicated Hosts', 'Amazon EBS', 'AWS Direct Connect'],
    correctOptionId: 'a',
    explanation:
      'AWS Lambda is a serverless compute service. Customers upload code and configure events, while AWS manages the underlying compute infrastructure.',
    reference: 'AWS Lambda Developer Guide',
    tags: ['lambda', 'serverless', 'compute'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-compute-003',
    domain: 'Compute',
    subDomain: 'Scaling',
    difficulty: 'medium',
    questionText: 'Which AWS capability automatically adjusts the number of EC2 instances based on demand?',
    options: ['Amazon EC2 Auto Scaling', 'AWS Artifact', 'Amazon Route 53 Resolver', 'AWS KMS'],
    correctOptionId: 'a',
    explanation:
      'Amazon EC2 Auto Scaling helps maintain application availability by adding or removing EC2 instances according to scaling policies.',
    reference: 'Amazon EC2 Auto Scaling User Guide',
    tags: ['auto scaling', 'ec2', 'elasticity'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-compute-004',
    domain: 'Compute',
    subDomain: 'Containers',
    difficulty: 'medium',
    questionText: 'Which AWS service is commonly used to run and manage Docker containers at scale?',
    options: ['Amazon ECS', 'Amazon RDS', 'AWS CloudTrail', 'Amazon S3 Glacier'],
    correctOptionId: 'a',
    explanation:
      'Amazon Elastic Container Service is a container orchestration service used to run and manage containerized applications on AWS.',
    reference: 'Amazon Elastic Container Service Developer Guide',
    tags: ['ecs', 'containers', 'orchestration'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-compute-005',
    domain: 'Compute',
    subDomain: 'Application platforms',
    difficulty: 'medium',
    questionText: 'A team wants to deploy a web application while AWS handles capacity provisioning, load balancing, and application health monitoring. Which service fits best?',
    options: ['AWS Elastic Beanstalk', 'AWS Organizations', 'Amazon Macie', 'AWS Artifact'],
    correctOptionId: 'a',
    explanation:
      'AWS Elastic Beanstalk is a platform service for deploying and scaling web applications while AWS manages much of the underlying infrastructure workflow.',
    reference: 'AWS Elastic Beanstalk Developer Guide',
    tags: ['elastic beanstalk', 'paas', 'web applications'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-compute-006',
    domain: 'Compute',
    subDomain: 'Simplified compute',
    difficulty: 'hard',
    questionText: 'Which AWS service offers simple virtual private servers with bundled compute, storage, and networking for straightforward workloads?',
    options: ['Amazon Lightsail', 'Amazon Redshift', 'AWS Glue', 'Amazon CloudWatch Logs'],
    correctOptionId: 'a',
    explanation:
      'Amazon Lightsail provides an easy way to launch simple virtual private servers with bundled resources and predictable pricing.',
    reference: 'Amazon Lightsail Documentation',
    tags: ['lightsail', 'vps', 'simple workloads'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-storage-001',
    domain: 'Storage',
    subDomain: 'Object storage',
    difficulty: 'easy',
    questionText: 'Which AWS service is designed for scalable object storage?',
    options: ['Amazon S3', 'Amazon RDS', 'AWS Lambda', 'Amazon VPC'],
    correctOptionId: 'a',
    explanation:
      'Amazon Simple Storage Service stores data as objects in buckets and is commonly used for static assets, backups, logs, and data lakes.',
    reference: 'Amazon S3 User Guide',
    tags: ['s3', 'object storage', 'storage'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-storage-002',
    domain: 'Storage',
    subDomain: 'Block storage',
    difficulty: 'easy',
    questionText: 'Which AWS service provides block storage volumes for use with Amazon EC2 instances?',
    options: ['Amazon EBS', 'Amazon S3', 'Amazon Route 53', 'AWS CloudTrail'],
    correctOptionId: 'a',
    explanation:
      'Amazon Elastic Block Store provides persistent block storage volumes that can be attached to EC2 instances.',
    reference: 'Amazon EBS User Guide',
    tags: ['ebs', 'block storage', 'ec2'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-storage-003',
    domain: 'Storage',
    subDomain: 'File storage',
    difficulty: 'medium',
    questionText: 'Which AWS service provides a scalable shared file system that can be mounted by multiple Linux-based EC2 instances?',
    options: ['Amazon EFS', 'Amazon DynamoDB', 'AWS KMS', 'Amazon SNS'],
    correctOptionId: 'a',
    explanation:
      'Amazon Elastic File System provides managed NFS file storage that can be accessed by multiple compatible compute resources.',
    reference: 'Amazon EFS User Guide',
    tags: ['efs', 'file storage', 'nfs'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-storage-004',
    domain: 'Storage',
    subDomain: 'Archive storage',
    difficulty: 'medium',
    questionText: 'Which Amazon S3 storage class is intended for long-term archival data that is rarely accessed?',
    options: ['S3 Glacier Deep Archive', 'S3 Standard', 'S3 Express One Zone', 'S3 Intelligent-Tiering Frequent Access tier only'],
    correctOptionId: 'a',
    explanation:
      'S3 Glacier Deep Archive is designed for low-cost, long-term retention of rarely accessed data with retrieval times measured in hours.',
    reference: 'Amazon S3 User Guide - Storage classes',
    tags: ['s3 glacier', 'archive', 'storage classes'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-storage-005',
    domain: 'Storage',
    subDomain: 'Lifecycle management',
    difficulty: 'medium',
    questionText: 'Which Amazon S3 feature can automatically move objects to lower-cost storage classes as they age?',
    options: ['S3 Lifecycle rules', 'S3 bucket versioning only', 'S3 Object Lock legal hold only', 'S3 static website hosting'],
    correctOptionId: 'a',
    explanation:
      'S3 Lifecycle rules can transition objects between storage classes or expire objects based on age and defined policies.',
    reference: 'Amazon S3 User Guide - Managing lifecycle configuration',
    tags: ['s3 lifecycle', 'cost optimization', 'storage classes'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-storage-006',
    domain: 'Storage',
    subDomain: 'Hybrid storage',
    difficulty: 'hard',
    questionText: 'Which AWS service connects on-premises environments with cloud storage using file, volume, or tape gateway configurations?',
    options: ['AWS Storage Gateway', 'AWS CodeCommit', 'AWS Shield', 'Amazon EventBridge'],
    correctOptionId: 'a',
    explanation:
      'AWS Storage Gateway is a hybrid cloud storage service that gives on-premises applications access to cloud-backed storage.',
    reference: 'AWS Storage Gateway User Guide',
    tags: ['storage gateway', 'hybrid cloud', 'migration'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-networking-001',
    domain: 'Networking',
    subDomain: 'Virtual networking',
    difficulty: 'easy',
    questionText: 'Which AWS service lets customers create an isolated virtual network in the AWS Cloud?',
    options: ['Amazon VPC', 'AWS Shield', 'Amazon CloudWatch', 'AWS Artifact'],
    correctOptionId: 'a',
    explanation:
      'Amazon Virtual Private Cloud lets customers define private IP ranges, subnets, route tables, gateways, and network boundaries.',
    reference: 'Amazon VPC User Guide',
    tags: ['vpc', 'network isolation', 'networking'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-networking-002',
    domain: 'Networking',
    subDomain: 'Instance firewalls',
    difficulty: 'easy',
    questionText: 'Which VPC security control acts as a stateful virtual firewall for EC2 instances?',
    options: ['Security group', 'Network ACL', 'Route table', 'Internet gateway'],
    correctOptionId: 'a',
    explanation:
      'Security groups are stateful virtual firewalls associated with elastic network interfaces, commonly used to control traffic to EC2 instances.',
    reference: 'Amazon VPC User Guide - Security groups',
    tags: ['security groups', 'firewall', 'vpc'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-networking-003',
    domain: 'Networking',
    subDomain: 'Subnet firewalls',
    difficulty: 'medium',
    questionText: 'Which VPC security control is stateless and operates at the subnet level?',
    options: ['Network ACL', 'Security group', 'IAM permission boundary', 'AWS Budgets action'],
    correctOptionId: 'a',
    explanation:
      'Network ACLs are stateless controls associated with subnets. Inbound and outbound rules are evaluated separately.',
    reference: 'Amazon VPC User Guide - Network ACLs',
    tags: ['network acl', 'subnets', 'stateless'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-networking-004',
    domain: 'Networking',
    subDomain: 'DNS',
    difficulty: 'medium',
    questionText: 'Which AWS service provides highly available domain name system registration and routing?',
    options: ['Amazon Route 53', 'Amazon EFS', 'AWS Lambda', 'AWS Secrets Manager'],
    correctOptionId: 'a',
    explanation:
      'Amazon Route 53 is a highly available and scalable DNS web service. It supports domain registration, DNS routing, and health checks.',
    reference: 'Amazon Route 53 Developer Guide',
    tags: ['route 53', 'dns', 'routing'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-networking-005',
    domain: 'Networking',
    subDomain: 'Traffic distribution',
    difficulty: 'medium',
    questionText: 'Which AWS service distributes incoming application traffic across multiple targets such as EC2 instances?',
    options: ['Elastic Load Balancing', 'AWS CloudTrail', 'Amazon DynamoDB', 'AWS Artifact'],
    correctOptionId: 'a',
    explanation:
      'Elastic Load Balancing automatically distributes incoming traffic across targets such as EC2 instances, containers, and IP addresses.',
    reference: 'Elastic Load Balancing User Guide',
    tags: ['load balancing', 'availability', 'traffic'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-networking-006',
    domain: 'Networking',
    subDomain: 'Dedicated connectivity',
    difficulty: 'hard',
    questionText: 'Which AWS service provides a dedicated private network connection from an on-premises data center to AWS?',
    options: ['AWS Direct Connect', 'Amazon CloudFront', 'AWS Step Functions', 'Amazon Inspector'],
    correctOptionId: 'a',
    explanation:
      'AWS Direct Connect establishes a dedicated network connection between a customer location and AWS, which can provide more consistent network performance.',
    reference: 'AWS Direct Connect User Guide',
    tags: ['direct connect', 'hybrid networking', 'private connectivity'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-databases-001',
    domain: 'Databases',
    subDomain: 'Relational databases',
    difficulty: 'easy',
    questionText: 'Which AWS service provides managed relational databases such as MySQL, PostgreSQL, and MariaDB?',
    options: ['Amazon RDS', 'Amazon S3', 'AWS IAM', 'Amazon CloudWatch'],
    correctOptionId: 'a',
    explanation:
      'Amazon Relational Database Service manages common relational database engines and handles tasks such as provisioning, patching, backups, and monitoring.',
    reference: 'Amazon RDS User Guide',
    tags: ['rds', 'relational database', 'managed database'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-databases-002',
    domain: 'Databases',
    subDomain: 'NoSQL databases',
    difficulty: 'easy',
    questionText: 'Which AWS database service is a fully managed NoSQL key-value and document database?',
    options: ['Amazon DynamoDB', 'Amazon Aurora', 'Amazon Redshift', 'Amazon RDS for PostgreSQL'],
    correctOptionId: 'a',
    explanation:
      'Amazon DynamoDB is a serverless NoSQL database service designed for key-value and document data models at high scale.',
    reference: 'Amazon DynamoDB Developer Guide',
    tags: ['dynamodb', 'nosql', 'serverless database'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-databases-003',
    domain: 'Databases',
    subDomain: 'Cloud-native relational databases',
    difficulty: 'medium',
    questionText: 'Which AWS database service is compatible with MySQL and PostgreSQL and designed for cloud-native relational performance?',
    options: ['Amazon Aurora', 'Amazon Neptune', 'Amazon DocumentDB', 'Amazon ElastiCache'],
    correctOptionId: 'a',
    explanation:
      'Amazon Aurora is a relational database engine compatible with MySQL and PostgreSQL and designed for high performance and availability in the cloud.',
    reference: 'Amazon Aurora User Guide',
    tags: ['aurora', 'mysql', 'postgresql'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-databases-004',
    domain: 'Databases',
    subDomain: 'Analytics databases',
    difficulty: 'medium',
    questionText: 'Which AWS service is a managed data warehouse for analytics at scale?',
    options: ['Amazon Redshift', 'Amazon Route 53', 'AWS KMS', 'Amazon SQS'],
    correctOptionId: 'a',
    explanation:
      'Amazon Redshift is a managed data warehouse service used for large-scale analytics and SQL-based reporting.',
    reference: 'Amazon Redshift Management Guide',
    tags: ['redshift', 'data warehouse', 'analytics'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-databases-005',
    domain: 'Databases',
    subDomain: 'Caching',
    difficulty: 'medium',
    questionText: 'Which AWS service provides managed in-memory caching using engines such as Redis or Memcached?',
    options: ['Amazon ElastiCache', 'Amazon S3 Glacier', 'AWS CloudFormation', 'AWS Config'],
    correctOptionId: 'a',
    explanation:
      'Amazon ElastiCache is a managed in-memory caching service that can improve application latency and reduce database load.',
    reference: 'Amazon ElastiCache User Guide',
    tags: ['elasticache', 'caching', 'redis'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-databases-006',
    domain: 'Databases',
    subDomain: 'Database migration',
    difficulty: 'hard',
    questionText: 'Which AWS service helps migrate databases to AWS with minimal downtime?',
    options: ['AWS Database Migration Service', 'AWS DataSync only', 'Amazon CloudFront', 'AWS WAF'],
    correctOptionId: 'a',
    explanation:
      'AWS Database Migration Service helps migrate databases to AWS and can support ongoing replication to reduce downtime during migration.',
    reference: 'AWS Database Migration Service User Guide',
    tags: ['dms', 'migration', 'databases'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-support-plans-001',
    domain: 'Support plans',
    subDomain: 'Basic Support',
    difficulty: 'easy',
    questionText: 'Which AWS Support plan is included for all AWS customers at no additional charge?',
    options: ['Basic', 'Developer', 'Business', 'Enterprise'],
    correctOptionId: 'a',
    explanation:
      'Basic Support is included for all AWS customers and provides account and billing support, service health information, documentation, whitepapers, and support forums.',
    reference: 'AWS Support Plans',
    tags: ['basic support', 'support plans', 'billing support'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-support-plans-002',
    domain: 'Support plans',
    subDomain: 'Developer Support',
    difficulty: 'easy',
    questionText: 'Which AWS Support plan is intended for early development and test environments and provides business-hours email access to cloud support associates?',
    options: ['Developer', 'Basic', 'Enterprise', 'Enterprise On-Ramp'],
    correctOptionId: 'a',
    explanation:
      'Developer Support is designed for experimentation, early development, and test workloads, with business-hours email access to cloud support associates.',
    reference: 'AWS Support Plans',
    tags: ['developer support', 'development', 'support access'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-support-plans-003',
    domain: 'Support plans',
    subDomain: 'Business Support',
    difficulty: 'medium',
    questionText: 'Which AWS Support plan is generally recommended for production workloads and provides 24/7 access to cloud support engineers?',
    options: ['Business', 'Basic', 'Developer', 'AWS Free Tier'],
    correctOptionId: 'a',
    explanation:
      'Business Support is intended for production workloads and includes 24/7 access to cloud support engineers through phone, chat, and web channels.',
    reference: 'AWS Support Plans',
    tags: ['business support', 'production', '24x7 support'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-support-plans-004',
    domain: 'Support plans',
    subDomain: 'Enterprise Support',
    difficulty: 'medium',
    questionText: 'Which AWS Support plan includes a designated Technical Account Manager?',
    options: ['Enterprise', 'Developer', 'Basic', 'AWS Marketplace Seller Support'],
    correctOptionId: 'a',
    explanation:
      'Enterprise Support includes a designated Technical Account Manager who provides proactive guidance and coordination for the customer environment.',
    reference: 'AWS Support Plans - Enterprise Support',
    tags: ['enterprise support', 'technical account manager', 'tam'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-support-plans-005',
    domain: 'Support plans',
    subDomain: 'Trusted Advisor access',
    difficulty: 'medium',
    questionText: 'Which support plan level provides access to the full set of AWS Trusted Advisor checks?',
    options: ['Business and Enterprise', 'Basic only', 'Developer only', 'All plans with identical checks'],
    correctOptionId: 'a',
    explanation:
      'Business, Enterprise On-Ramp, and Enterprise Support provide access to the full set of AWS Trusted Advisor checks. Basic and Developer include a limited core set.',
    reference: 'AWS Trusted Advisor - Support plan access',
    tags: ['trusted advisor', 'support plans', 'checks'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-support-plans-006',
    domain: 'Support plans',
    subDomain: 'Account assistance',
    difficulty: 'hard',
    questionText: 'Which AWS Support plan includes access to the Concierge Support Team for account and billing guidance?',
    options: ['Enterprise', 'Developer', 'Basic', 'No support plan includes this'],
    correctOptionId: 'a',
    explanation:
      'Enterprise Support includes access to the Concierge Support Team, which helps with account, billing, and cost-related questions.',
    reference: 'AWS Support Plans - Enterprise Support',
    tags: ['concierge', 'enterprise support', 'billing guidance'],
    isPremium: true
  }),

  q({
    id: 'aws-ccp-cloud-concepts-007',
    domain: 'Cloud concepts',
    subDomain: 'Reliability concepts',
    difficulty: 'medium',
    questionText: 'Which design approach helps reduce the impact of a single component failure in a cloud workload?',
    options: ['Design for failure', 'Use one large server', 'Disable monitoring alerts', 'Store all backups on the same instance'],
    correctOptionId: 'a',
    explanation:
      'Designing for failure means expecting components to fail and building systems with redundancy, automation, and recovery paths.',
    reference: 'AWS Well-Architected Framework - Reliability Pillar',
    tags: ['reliability', 'design for failure', 'architecture'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-security-compliance-007',
    domain: 'Security and compliance',
    subDomain: 'Audit logging',
    difficulty: 'medium',
    questionText: 'Which AWS service records API activity and account events for auditing and governance?',
    options: ['AWS CloudTrail', 'Amazon CloudWatch Metrics only', 'AWS Budgets', 'Amazon Route 53'],
    correctOptionId: 'a',
    explanation:
      'AWS CloudTrail records AWS API calls and account activity, helping teams audit changes, investigate events, and support governance requirements.',
    reference: 'AWS CloudTrail User Guide',
    tags: ['cloudtrail', 'audit', 'governance'],
    isPremium: false
  }),
  q({
    id: 'aws-ccp-technology-007',
    domain: 'Technology',
    subDomain: 'Event-driven architecture',
    difficulty: 'hard',
    questionText: 'Which AWS service can route events from AWS services, SaaS applications, and custom applications to targets for event-driven workflows?',
    options: ['Amazon EventBridge', 'Amazon EBS', 'AWS Artifact', 'AWS Pricing Calculator'],
    correctOptionId: 'a',
    explanation:
      'Amazon EventBridge is a serverless event bus service that routes events from many sources to targets such as Lambda functions, Step Functions, and queues.',
    reference: 'Amazon EventBridge User Guide',
    tags: ['eventbridge', 'events', 'serverless'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-billing-pricing-007',
    domain: 'Billing and pricing',
    subDomain: 'Cost allocation',
    difficulty: 'medium',
    questionText: 'Which practice helps allocate AWS costs to teams, projects, or environments?',
    options: ['Apply cost allocation tags', 'Disable consolidated billing', 'Use one root user for all work', 'Remove all budgets'],
    correctOptionId: 'a',
    explanation:
      'Cost allocation tags help categorize AWS costs by dimensions such as project, owner, department, or environment.',
    reference: 'AWS Billing and Cost Management - Cost allocation tags',
    tags: ['cost allocation', 'tags', 'billing'],
    isPremium: true
  }),
  q({
    id: 'aws-ccp-global-infrastructure-007',
    domain: 'Global infrastructure',
    subDomain: 'Content delivery',
    difficulty: 'medium',
    questionText: 'Which AWS service uses the global edge network to deliver cached content with low latency?',
    options: ['Amazon CloudFront', 'Amazon RDS', 'AWS IAM Identity Center', 'Amazon EBS'],
    correctOptionId: 'a',
    explanation:
      'Amazon CloudFront is a content delivery network that uses AWS edge locations to cache and deliver content closer to users.',
    reference: 'Amazon CloudFront Developer Guide',
    tags: ['cloudfront', 'cdn', 'edge network'],
    isPremium: false
  })
];
