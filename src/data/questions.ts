import type { Question } from '@/types';

export const questionBank: readonly Question[] = [
  {
    id: 'aws-ccp-q1',
    certificationId: 'aws-ccp',
    domain: 'Cloud concepts',
    difficulty: 'easy',
    prompt: 'Which statement best describes cloud computing?',
    options: [
      'Buying physical servers for a private data center',
      'On-demand delivery of IT resources over the internet with pay-as-you-go pricing',
      'Running all applications from a single laptop',
      'A fixed monthly contract for dedicated hardware only'
    ],
    correctAnswer: 'On-demand delivery of IT resources over the internet with pay-as-you-go pricing',
    explanation: 'Cloud computing provides on-demand access to IT resources with usage-based pricing.'
  },
  {
    id: 'aws-ccp-q2',
    certificationId: 'aws-ccp',
    domain: 'AWS global infrastructure',
    difficulty: 'easy',
    prompt: 'What is an AWS Availability Zone?',
    options: [
      'A billing account boundary',
      'One or more discrete data centers with redundant power, networking, and connectivity',
      'A support plan tier',
      'A global DNS service'
    ],
    correctAnswer: 'One or more discrete data centers with redundant power, networking, and connectivity',
    explanation: 'Availability Zones are isolated locations inside a Region designed for high availability.'
  },
  {
    id: 'aws-ccp-q3',
    certificationId: 'aws-ccp',
    domain: 'Security and compliance',
    difficulty: 'medium',
    prompt: 'Under the AWS shared responsibility model, which task is AWS responsible for?',
    options: [
      'Managing customer IAM users',
      'Encrypting customer application code',
      'Protecting the physical infrastructure that runs AWS services',
      'Choosing customer password rotation policy'
    ],
    correctAnswer: 'Protecting the physical infrastructure that runs AWS services',
    explanation: 'AWS is responsible for security of the cloud, including facilities and managed infrastructure.'
  },
  {
    id: 'aws-ccp-q4',
    certificationId: 'aws-ccp',
    domain: 'Compute',
    difficulty: 'easy',
    prompt: 'Which AWS service provides resizable virtual servers in the cloud?',
    options: ['Amazon S3', 'Amazon EC2', 'AWS IAM', 'Amazon Route 53'],
    correctAnswer: 'Amazon EC2',
    explanation: 'Amazon EC2 provides virtual machine capacity that can be resized and managed by the customer.'
  },
  {
    id: 'aws-ccp-q5',
    certificationId: 'aws-ccp',
    domain: 'Storage',
    difficulty: 'easy',
    prompt: 'Which AWS service is commonly used for object storage?',
    options: ['Amazon S3', 'Amazon RDS', 'AWS Lambda', 'Amazon VPC'],
    correctAnswer: 'Amazon S3',
    explanation: 'Amazon S3 stores objects in buckets for static assets, backups, logs, and data lakes.'
  },
  {
    id: 'aws-ccp-q6',
    certificationId: 'aws-ccp',
    domain: 'Databases',
    difficulty: 'medium',
    prompt: 'Which AWS database service is a managed NoSQL key-value and document database?',
    options: ['Amazon Aurora', 'Amazon DynamoDB', 'Amazon Redshift', 'Amazon RDS for PostgreSQL'],
    correctAnswer: 'Amazon DynamoDB',
    explanation: 'DynamoDB is a fully managed NoSQL database for high-scale key-value and document workloads.'
  },
  {
    id: 'aws-ccp-q7',
    certificationId: 'aws-ccp',
    domain: 'Networking',
    difficulty: 'medium',
    prompt: 'Which AWS service lets customers create an isolated virtual network?',
    options: ['Amazon VPC', 'AWS Shield', 'AWS CloudTrail', 'Amazon CloudWatch'],
    correctAnswer: 'Amazon VPC',
    explanation: 'Amazon VPC defines private IP ranges, subnets, route tables, and network boundaries.'
  },
  {
    id: 'aws-ccp-q8',
    certificationId: 'aws-ccp',
    domain: 'Billing and pricing',
    difficulty: 'easy',
    prompt: 'Which AWS tool helps estimate monthly cloud costs before deployment?',
    options: ['AWS Pricing Calculator', 'AWS CloudTrail', 'AWS Trusted Advisor only', 'AWS Artifact'],
    correctAnswer: 'AWS Pricing Calculator',
    explanation: 'AWS Pricing Calculator helps model service usage and estimate projected monthly costs.'
  },
  {
    id: 'aws-ccp-q9',
    certificationId: 'aws-ccp',
    domain: 'Monitoring',
    difficulty: 'medium',
    prompt: 'Which service collects metrics and logs for AWS resources and applications?',
    options: ['Amazon CloudWatch', 'AWS Config', 'AWS Organizations', 'Amazon Cognito'],
    correctAnswer: 'Amazon CloudWatch',
    explanation: 'CloudWatch collects metrics, logs, alarms, and dashboards for AWS workloads.'
  },
  {
    id: 'aws-ccp-q10',
    certificationId: 'aws-ccp',
    domain: 'Support plans',
    difficulty: 'medium',
    prompt: 'Which AWS Support plan provides access to a Technical Account Manager?',
    options: ['Basic', 'Developer', 'Business', 'Enterprise'],
    correctAnswer: 'Enterprise',
    explanation: 'Enterprise Support includes a designated Technical Account Manager.'
  },
  {
    id: 'aws-ccp-q11',
    certificationId: 'aws-ccp',
    domain: 'Serverless',
    difficulty: 'easy',
    prompt: 'Which AWS service runs code without provisioning or managing servers?',
    options: ['AWS Lambda', 'Amazon EC2 Auto Scaling', 'Amazon EBS', 'Amazon Lightsail'],
    correctAnswer: 'AWS Lambda',
    explanation: 'AWS Lambda is a serverless compute service where AWS manages the underlying servers.'
  },
  {
    id: 'aws-ccp-q12',
    certificationId: 'aws-ccp',
    domain: 'Security and compliance',
    difficulty: 'medium',
    prompt: 'Which service helps securely manage access to AWS services and resources?',
    options: ['AWS IAM', 'Amazon SQS', 'Amazon Kinesis', 'AWS Snowball'],
    correctAnswer: 'AWS IAM',
    explanation: 'IAM manages users, groups, roles, policies, and permissions in AWS.'
  }
];
