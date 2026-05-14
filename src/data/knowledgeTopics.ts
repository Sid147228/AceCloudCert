import { AWS_CCP_CERTIFICATION_ID } from './questions';
import type { KnowledgeTopic } from '@/types';

export const knowledgeTopics: readonly KnowledgeTopic[] = [
  {
    id: 'cloud-computing',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'What is cloud computing?',
    category: 'Cloud concepts',
    estimatedReadingMinutes: 5,
    summary:
      'Cloud computing is the on-demand delivery of IT resources over the internet with usage-based pricing.',
    fullExplanation: [
      'Cloud computing lets organizations use compute, storage, databases, networking, analytics, and security services without buying and operating all of the underlying hardware themselves.',
      'In AWS, customers provision resources when they need them, scale those resources as demand changes, and pay for the capacity they consume. This changes infrastructure from a large upfront purchase into a flexible operating model.',
      'The AWS Cloud also gives learners access to managed services. Managed services reduce operational work such as hardware maintenance, capacity planning, and some routine administration tasks.'
    ],
    keyPoints: [
      'Cloud resources are available on demand.',
      'Elasticity helps match capacity to real traffic.',
      'Pay-as-you-go pricing reduces large upfront infrastructure purchases.',
      'Managed services help teams focus on applications instead of physical infrastructure.'
    ],
    practicalExample:
      'A startup can launch a web app on AWS using EC2, S3, and RDS without buying servers. If traffic grows after a marketing campaign, the team can scale resources and later reduce capacity when demand falls.',
    relatedQuestionIds: ['aws-ccp-cloud-concepts-001', 'aws-ccp-cloud-concepts-002', 'aws-ccp-cloud-concepts-003']
  },
  {
    id: 'aws-global-infrastructure',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'AWS global infrastructure',
    category: 'Global infrastructure',
    estimatedReadingMinutes: 6,
    summary:
      'AWS global infrastructure is the worldwide network of Regions, Availability Zones, edge locations, and specialized local infrastructure.',
    fullExplanation: [
      'AWS organizes infrastructure into geographic Regions. Each Region is isolated from other Regions and contains multiple Availability Zones.',
      'Availability Zones are physically separate locations with redundant power, networking, and connectivity. Designing across multiple Availability Zones helps reduce the impact of localized failures.',
      'AWS also operates edge locations for services such as Amazon CloudFront. Edge locations cache content closer to users to improve latency for global applications.'
    ],
    keyPoints: [
      'Regions are separate geographic areas.',
      'Availability Zones are isolated locations inside a Region.',
      'Edge locations support low-latency content delivery.',
      'Region choice can depend on latency, cost, service availability, and compliance requirements.'
    ],
    practicalExample:
      'A media company can host an application in a Region near its primary users while using CloudFront edge locations to deliver images and videos faster to viewers around the world.',
    relatedQuestionIds: ['aws-ccp-global-infrastructure-001', 'aws-ccp-global-infrastructure-003', 'aws-ccp-global-infrastructure-007']
  },
  {
    id: 'regions-availability-zones',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'Regions and Availability Zones',
    category: 'Global infrastructure',
    estimatedReadingMinutes: 6,
    summary:
      'Regions and Availability Zones are core AWS building blocks for resilient and low-latency architecture.',
    fullExplanation: [
      'A Region is a geographic area such as US East, Europe, or Asia Pacific. Workloads are deployed into a Region based on business, technical, and regulatory needs.',
      'An Availability Zone is one or more discrete data centers inside a Region. Availability Zones are connected with low-latency links but are isolated enough to reduce correlated failure risk.',
      'Highly available production workloads often run across at least two Availability Zones. This allows an application to continue operating if one Availability Zone has an issue.'
    ],
    keyPoints: [
      'Regions are isolated from each other.',
      'Availability Zones are designed for fault isolation.',
      'Multi-AZ design improves availability.',
      'Data residency and latency are common Region-selection factors.'
    ],
    practicalExample:
      'A banking application can deploy web servers across two Availability Zones and place a load balancer in front of them. If one zone has a problem, traffic can continue flowing to healthy targets in the other zone.',
    relatedQuestionIds: ['aws-ccp-global-infrastructure-001', 'aws-ccp-global-infrastructure-002', 'aws-ccp-global-infrastructure-005']
  },
  {
    id: 'shared-responsibility-model',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'Shared responsibility model',
    category: 'Security and compliance',
    estimatedReadingMinutes: 6,
    summary:
      'The shared responsibility model explains which security tasks belong to AWS and which tasks belong to the customer.',
    fullExplanation: [
      'AWS is responsible for security of the cloud. This includes the physical facilities, hardware, global network, and foundational infrastructure that run AWS services.',
      'Customers are responsible for security in the cloud. Their responsibilities vary by service, but commonly include identity management, data classification, application security, and configuration choices.',
      'Managed services shift more operational responsibility to AWS, but customers still need to configure access, protect data, and follow security best practices.'
    ],
    keyPoints: [
      'AWS protects the infrastructure that runs AWS services.',
      'Customers manage their data, identities, and application configuration.',
      'Responsibilities vary across IaaS, PaaS, and managed services.',
      'Misconfigured permissions remain a customer responsibility.'
    ],
    practicalExample:
      'For Amazon EC2, AWS maintains the physical servers and networking, while the customer patches the guest operating system, configures security groups, and secures application code.',
    relatedQuestionIds: ['aws-ccp-security-compliance-001', 'aws-ccp-cloud-concepts-004', 'aws-ccp-security-compliance-004']
  },
  {
    id: 'iam-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'IAM basics',
    category: 'Security and compliance',
    estimatedReadingMinutes: 7,
    summary:
      'AWS Identity and Access Management controls who can access AWS resources and what actions they can perform.',
    fullExplanation: [
      'IAM is the primary AWS service for access control. It uses identities such as users, groups, and roles, and permissions are granted through policies.',
      'IAM roles are commonly used by applications and AWS services because they provide temporary credentials. This is safer than storing long-term access keys inside application code.',
      'A strong IAM strategy uses least privilege, multi-factor authentication for sensitive access, and regular review of permissions.'
    ],
    keyPoints: [
      'IAM users represent people or workloads needing direct access.',
      'IAM groups help manage permissions for multiple users.',
      'IAM roles provide temporary credentials.',
      'Least privilege means granting only the permissions required.'
    ],
    practicalExample:
      'A developer who only needs to read logs should receive a policy that permits CloudWatch Logs read actions, not full administrator access to the AWS account.',
    relatedQuestionIds: ['aws-ccp-security-compliance-002', 'aws-ccp-security-compliance-003', 'aws-ccp-security-compliance-004']
  },
  {
    id: 'ec2-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'EC2 basics',
    category: 'Compute',
    estimatedReadingMinutes: 6,
    summary:
      'Amazon EC2 provides resizable virtual servers for workloads that need control over compute instances.',
    fullExplanation: [
      'Amazon Elastic Compute Cloud provides virtual machines called instances. Customers choose instance types, operating systems, networking, storage, and scaling patterns.',
      'EC2 is useful when teams need control over the operating system or runtime environment. It is more hands-on than serverless services because customers manage more of the software stack.',
      'EC2 Auto Scaling can add or remove instances based on demand, helping applications stay available while controlling cost.'
    ],
    keyPoints: [
      'EC2 instances are virtual servers.',
      'Customers manage the guest operating system and installed software.',
      'Instance types are optimized for different workload profiles.',
      'Auto Scaling adjusts capacity based on demand.'
    ],
    practicalExample:
      'A company can run a legacy web application on EC2 instances while using Auto Scaling to add instances during high traffic and remove them during quiet periods.',
    relatedQuestionIds: ['aws-ccp-compute-001', 'aws-ccp-compute-003', 'aws-ccp-cloud-concepts-004']
  },
  {
    id: 's3-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'S3 basics',
    category: 'Storage',
    estimatedReadingMinutes: 6,
    summary:
      'Amazon S3 is scalable object storage used for files, backups, logs, static content, and data lakes.',
    fullExplanation: [
      'Amazon Simple Storage Service stores data as objects inside buckets. An object includes the data, metadata, and a key that identifies it.',
      'S3 is designed for high durability and scale. It is commonly used for static websites, application assets, backups, analytics data, and archival workflows.',
      'S3 storage classes and lifecycle rules help optimize cost by moving data to cheaper storage when access patterns change.'
    ],
    keyPoints: [
      'S3 stores objects in buckets.',
      'S3 is not block storage for running operating systems.',
      'Storage classes support different access and cost patterns.',
      'Lifecycle rules can transition or expire objects automatically.'
    ],
    practicalExample:
      'An online learning platform can store course images, exported reports, and access logs in S3, then move older logs to archival storage using lifecycle rules.',
    relatedQuestionIds: ['aws-ccp-storage-001', 'aws-ccp-storage-004', 'aws-ccp-storage-005']
  },
  {
    id: 'rds-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'RDS basics',
    category: 'Databases',
    estimatedReadingMinutes: 6,
    summary:
      'Amazon RDS is a managed relational database service for engines such as MySQL, PostgreSQL, and MariaDB.',
    fullExplanation: [
      'Amazon Relational Database Service reduces the operational work of running relational databases. AWS handles tasks such as provisioning, backups, patching, and monitoring depending on configuration.',
      'RDS supports several familiar database engines, making it a strong fit for applications that rely on SQL and relational data models.',
      'For higher availability, customers can use Multi-AZ deployments. For read-heavy workloads, read replicas can help scale read traffic.'
    ],
    keyPoints: [
      'RDS is for relational database workloads.',
      'AWS manages many database administration tasks.',
      'Multi-AZ deployments improve availability.',
      'Read replicas can support read scaling.'
    ],
    practicalExample:
      'A business application that uses PostgreSQL can migrate to Amazon RDS for PostgreSQL to reduce database maintenance while keeping a familiar relational engine.',
    relatedQuestionIds: ['aws-ccp-databases-001', 'aws-ccp-databases-003', 'aws-ccp-databases-006']
  },
  {
    id: 'lambda-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'Lambda basics',
    category: 'Compute',
    estimatedReadingMinutes: 6,
    summary:
      'AWS Lambda runs code in response to events without requiring customers to provision or manage servers.',
    fullExplanation: [
      'Lambda is a serverless compute service. Customers upload code, configure triggers, and AWS runs the code when events occur.',
      'Lambda is well suited for event-driven tasks such as processing uploaded files, reacting to API requests, or responding to messages from queues and event buses.',
      'Because AWS manages the servers, teams focus on code and event logic. Pricing is based on requests and compute duration.'
    ],
    keyPoints: [
      'Lambda is serverless compute.',
      'Functions run in response to events.',
      'Customers do not manage the underlying servers.',
      'Lambda can integrate with services such as S3, API Gateway, SQS, and EventBridge.'
    ],
    practicalExample:
      'When a user uploads an image to S3, Lambda can automatically resize the image and store the processed version in another bucket.',
    relatedQuestionIds: ['aws-ccp-compute-002', 'aws-ccp-technology-007', 'aws-ccp-technology-004']
  },
  {
    id: 'vpc-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'VPC basics',
    category: 'Networking',
    estimatedReadingMinutes: 7,
    summary:
      'Amazon VPC lets customers create isolated virtual networks for AWS resources.',
    fullExplanation: [
      'A Virtual Private Cloud is a logically isolated network in AWS. Customers define IP address ranges, subnets, route tables, gateways, and network controls.',
      'Subnets divide a VPC into smaller network segments. Public subnets can route to the internet through an internet gateway, while private subnets are commonly used for internal resources.',
      'Security groups and network ACLs help control traffic. Security groups are stateful and attached to network interfaces, while network ACLs are stateless and operate at the subnet level.'
    ],
    keyPoints: [
      'A VPC is an isolated AWS network boundary.',
      'Subnets organize resources within a VPC.',
      'Route tables control network traffic paths.',
      'Security groups and network ACLs provide layered network controls.'
    ],
    practicalExample:
      'A web application can place load balancers in public subnets and databases in private subnets, limiting direct internet exposure for database resources.',
    relatedQuestionIds: ['aws-ccp-networking-001', 'aws-ccp-networking-002', 'aws-ccp-networking-003']
  },
  {
    id: 'cloudwatch-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'CloudWatch basics',
    category: 'Technology',
    estimatedReadingMinutes: 5,
    summary:
      'Amazon CloudWatch provides monitoring and observability through metrics, logs, dashboards, and alarms.',
    fullExplanation: [
      'CloudWatch collects operational data from AWS resources and applications. This includes metrics such as CPU usage, logs from applications, and alarms that notify teams when thresholds are crossed.',
      'Dashboards help teams visualize the health of workloads. Alarms can trigger notifications or automated actions when metrics indicate a problem.',
      'For the Cloud Practitioner exam, understand that CloudWatch is the primary AWS service associated with metrics, logs, alarms, and operational visibility.'
    ],
    keyPoints: [
      'CloudWatch collects metrics and logs.',
      'Alarms notify teams when thresholds are met.',
      'Dashboards visualize operational health.',
      'CloudWatch supports observability for AWS resources and applications.'
    ],
    practicalExample:
      'An operations team can create a CloudWatch alarm that sends a notification when EC2 CPU utilization stays above 80% for several minutes.',
    relatedQuestionIds: ['aws-ccp-technology-001', 'aws-ccp-technology-005', 'aws-ccp-compute-003']
  },
  {
    id: 'cloudtrail-basics',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'CloudTrail basics',
    category: 'Security and compliance',
    estimatedReadingMinutes: 5,
    summary:
      'AWS CloudTrail records account activity and API calls for auditing, security analysis, and governance.',
    fullExplanation: [
      'CloudTrail helps answer who did what, when, and from where in an AWS account. It records management events and can be configured for additional event types.',
      'Security and operations teams use CloudTrail logs to investigate changes, support compliance audits, and detect unusual activity.',
      'CloudTrail is different from CloudWatch. CloudWatch focuses on metrics, logs, and alarms, while CloudTrail focuses on API activity and account events.'
    ],
    keyPoints: [
      'CloudTrail records AWS API activity.',
      'It supports auditing and governance.',
      'Logs can help investigate account changes.',
      'CloudTrail complements CloudWatch but serves a different purpose.'
    ],
    practicalExample:
      'If an S3 bucket policy changes unexpectedly, a security analyst can review CloudTrail events to see which principal made the API call.',
    relatedQuestionIds: ['aws-ccp-security-compliance-007', 'aws-ccp-technology-001', 'aws-ccp-security-compliance-005']
  },
  {
    id: 'pricing-billing',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'AWS pricing and billing',
    category: 'Billing and pricing',
    estimatedReadingMinutes: 7,
    summary:
      'AWS pricing depends on usage, service type, Region, data transfer, storage class, and purchase options.',
    fullExplanation: [
      'AWS uses a pay-as-you-go pricing model for many services. Costs are typically based on dimensions such as compute time, storage used, requests, or data transfer.',
      'Billing tools help customers estimate, monitor, and control spend. AWS Pricing Calculator estimates costs before deployment, AWS Budgets sends alerts, and Cost Explorer analyzes historical spend.',
      'Discount models such as Savings Plans can lower compute costs when customers commit to a consistent amount of usage over a one-year or three-year term.'
    ],
    keyPoints: [
      'Pricing varies by service and usage pattern.',
      'AWS Pricing Calculator estimates future costs.',
      'AWS Budgets alerts when spend crosses thresholds.',
      'Cost Explorer helps analyze historical cost and usage.'
    ],
    practicalExample:
      'Before launching a new application, a team can model expected EC2, S3, and data transfer costs in AWS Pricing Calculator, then create AWS Budgets alerts for production spend.',
    relatedQuestionIds: ['aws-ccp-billing-pricing-001', 'aws-ccp-billing-pricing-002', 'aws-ccp-billing-pricing-003']
  },
  {
    id: 'support-plans',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'AWS support plans',
    category: 'Support plans',
    estimatedReadingMinutes: 6,
    summary:
      'AWS Support plans provide different levels of technical support, response times, guidance, and account assistance.',
    fullExplanation: [
      'All customers receive Basic Support, which includes account and billing support, documentation, whitepapers, and service health resources.',
      'Developer Support is intended for early development and test use cases. Business Support is commonly aligned with production workloads and includes 24/7 access to cloud support engineers.',
      'Enterprise Support includes the highest level of proactive guidance, including a Technical Account Manager and access to the Concierge Support Team.'
    ],
    keyPoints: [
      'Basic Support is included for all AWS customers.',
      'Developer Support is for early development and testing.',
      'Business Support is suitable for production workloads.',
      'Enterprise Support includes a Technical Account Manager.'
    ],
    practicalExample:
      'A company running revenue-generating production systems may choose Business Support for 24/7 technical access, while a large enterprise may choose Enterprise Support for proactive account guidance.',
    relatedQuestionIds: ['aws-ccp-support-plans-001', 'aws-ccp-support-plans-003', 'aws-ccp-support-plans-004']
  },
  {
    id: 'well-architected-framework',
    certificationId: AWS_CCP_CERTIFICATION_ID,
    title: 'Well-Architected Framework',
    category: 'Cloud concepts',
    estimatedReadingMinutes: 7,
    summary:
      'The AWS Well-Architected Framework helps teams design and operate secure, reliable, efficient, cost-effective, and sustainable workloads.',
    fullExplanation: [
      'The Well-Architected Framework is a set of design principles, questions, and best practices for evaluating cloud workloads.',
      'Its pillars include operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. Cloud Practitioner learners should understand the purpose of the framework rather than memorizing deep implementation detail.',
      'The framework encourages teams to make informed tradeoffs, review workloads regularly, and improve architecture over time.'
    ],
    keyPoints: [
      'The framework helps evaluate cloud architecture quality.',
      'Security, reliability, and cost optimization are core pillars.',
      'Regular reviews help teams improve workloads over time.',
      'Well-architected systems are designed for change and failure.'
    ],
    practicalExample:
      'After launching a workload, a team can run a Well-Architected review to identify risks such as single-AZ deployment, missing monitoring, or inefficient resource sizing.',
    relatedQuestionIds: ['aws-ccp-cloud-concepts-006', 'aws-ccp-cloud-concepts-007', 'aws-ccp-technology-005']
  }
];
