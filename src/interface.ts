/**
 * Interface representing an ECS Task Definition.
 */
export interface ECSTaskDefinition {
    /**
     * The family name for the task definition.
     * A family acts as a group for multiple versions of the same task.
     */
    family: string;
  
    /**
     * The network mode to use for the task.
     * This can be "bridge", "host", "awsvpc", or "none".
     */
    networkMode?: "bridge" | "host" | "awsvpc" | "none";
  
    /**
     * The IAM role that the task should assume for making API requests.
     */
    taskRoleArn?: string;
  
    /**
     * The IAM execution role that the task uses to pull container images and log data.
     */
    executionRoleArn?: string;
  
    /**
     * The type of container launch to validate the task against.
     * Possible values are EC2, FARGATE, and EXTERNAL.
     */
    requiresCompatibilities?: ("EC2" | "FARGATE" | "EXTERNAL")[];
  
    /**
     * The CPU value to assign to the task (in vCPUs).
     */
    cpu?: string;
  
    /**
     * The memory value to assign to the task (in MiB).
     */
    memory?: string;
  
    /**
     * The task-level ephemeral storage.
     * This is used for Fargate tasks to configure additional disk space.
     */
    ephemeralStorage?: EphemeralStorage;
  
    /**
     * Defines the container configurations used by the task.
     */
    containerDefinitions: ContainerDefinition[];
  
    /**
     * The list of volume definitions that can be mounted by containers in the task.
     */
    volumes?: Volume[];
  
    /**
     * Constraints for task placement.
     */
    placementConstraints?: PlacementConstraint[];
  
    /**
     * Tags to apply to the task definition.
     */
    tags?: Tag[];
  
    /**
     * The operating system family used in the task.
     * Required for Fargate.
     */
    operatingSystemFamily?: "LINUX" | "WINDOWS_SERVER_2019_FULL" | "WINDOWS_SERVER_2019_CORE" | "WINDOWS_SERVER_2022_FULL" | "WINDOWS_SERVER_2022_CORE";
  
    /**
     * The CPU architecture of the task.
     * Required for Fargate.
     */
    cpuArchitecture?: "X86_64" | "ARM64";
  }
  
  /**
   * Interface representing a container definition inside a task definition.
   */
  interface ContainerDefinition {
    /**
     * The name of the container.
     */
    name: string;
  
    /**
     * The image used to start the container.
     */
    image: string;
  
    /**
     * The number of CPU units to allocate to the container.
     */
    cpu?: number;
  
    /**
     * The hard memory limit (in MiB) for the container.
     */
    memory?: number;
  
    /**
     * The soft memory limit (in MiB) for the container.
     */
    memoryReservation?: number;
  
    /**
     * Determines whether this container is essential for the task.
     */
    essential?: boolean;
  
    /**
     * The entry point for the container.
     */
    entryPoint?: string[];
  
    /**
     * The command passed to the container.
     */
    command?: string[];
  
    /**
     * Environment variables to set in the container.
     */
    environment?: EnvironmentVariable[];
  
    /**
     * The port mappings for the container.
     */
    portMappings?: PortMapping[];
  
    /**
     * The mount points for the container.
     */
    mountPoints?: MountPoint[];
  
    /**
     * The data volumes to mount from another container.
     */
    volumesFrom?: VolumeFrom[];
  
    /**
     * Log configuration for the container.
     */
    logConfiguration?: LogConfiguration;
  
    /**
     * Health check command and configuration for the container.
     */
    healthCheck?: HealthCheck;
  
    /**
     * Secrets to pass to the container from AWS Secrets Manager or SSM Parameter Store.
     */
    secrets?: Secret[];
  
    /**
     * The user to use inside the container.
     */
    user?: string;
  
    /**
     * The working directory in which commands are run.
     */
    workingDirectory?: string;
  
    /**
     * Whether the root file system is read-only.
     */
    readonlyRootFilesystem?: boolean;
  
    /**
     * The docker security options.
     */
    dockerSecurityOptions?: string[];
  
    /**
     * The ulimits for the container.
     */
    ulimits?: Ulimit[];
  
    /**
     * Linux-specific options for the container.
     */
    linuxParameters?: LinuxParameters;
  }
  
  /**
   * Represents an environment variable for a container.
   */
  interface EnvironmentVariable {
    name: string;
    value: string;
  }
  
  /**
   * Represents a port mapping for a container.
   */
  interface PortMapping {
    containerPort: number;
    hostPort?: number;
    protocol?: "tcp" | "udp";
  }
  
  /**
   * Represents a mount point for a container.
   */
  interface MountPoint {
    sourceVolume: string;
    containerPath: string;
    readOnly?: boolean;
  }
  
  /**
   * Represents a volume to mount from another container.
   */
  interface VolumeFrom {
    sourceContainer: string;
    readOnly?: boolean;
  }
  
  /**
   * Represents the log configuration for a container.
   */
  interface LogConfiguration {
    logDriver: string;
    options?: { [key: string]: string };
    secretOptions?: Secret[];
  }
  
  /**
   * Represents the health check configuration for a container.
   */
  interface HealthCheck {
    command: string[];
    interval?: number;
    timeout?: number;
    retries?: number;
    startPeriod?: number;
  }
  
  /**
   * Represents a secret to be passed to the container from Secrets Manager or SSM Parameter Store.
   */
  interface Secret {
    name: string;
    valueFrom: string;
  }
  
  /**
   * Represents a ulimit for a container.
   */
  interface Ulimit {
    name: string;
    softLimit: number;
    hardLimit: number;
  }
  
  /**
   * Linux-specific options for the container.
   */
  interface LinuxParameters {
    capabilities?: {
      add?: string[];
      drop?: string[];
    };
    devices?: Device[];
    initProcessEnabled?: boolean;
    sharedMemorySize?: number;
    tmpfs?: Tmpfs[];
  }
  
  /**
   * Represents a device to be exposed to the container.
   */
  interface Device {
    hostPath: string;
    containerPath?: string;
    permissions?: ("read" | "write" | "mknod")[];
  }
  
  /**
   * Represents a temporary file system (tmpfs) mount for a container.
   */
  interface Tmpfs {
    containerPath: string;
    size: number;
    mountOptions?: string[];
  }
  
  /**
   * Represents a volume definition.
   */
  interface Volume {
    name: string;
    host?: {
      sourcePath?: string;
    };
    dockerVolumeConfiguration?: DockerVolumeConfiguration;
    efsVolumeConfiguration?: EFSVolumeConfiguration;
  }
  
  /**
   * Represents Docker-specific volume configuration.
   */
  interface DockerVolumeConfiguration {
    scope?: "task" | "shared";
    autoprovision?: boolean;
    driver?: string;
    driverOpts?: { [key: string]: string };
    labels?: { [key: string]: string };
  }
  
  /**
   * Represents Amazon EFS volume configuration.
   */
  interface EFSVolumeConfiguration {
    fileSystemId: string;
    rootDirectory?: string;
    transitEncryption?: "ENABLED" | "DISABLED";
    transitEncryptionPort?: number;
    authorizationConfig?: {
      accessPointId?: string;
      iam?: "ENABLED" | "DISABLED";
    };
  }
  
  /**
   * Represents a tag associated with a task definition.
   */
  interface Tag {
    key: string;
    value: string;
  }
  
  /**
   * Represents an ephemeral storage configuration for Fargate tasks.
   */
  interface EphemeralStorage {
    sizeInGiB: number;
  }
  
  /**
   * Represents a placement constraint for task placement.
   */
  interface PlacementConstraint {
    type: "memberOf";
    expression: string;
  }
  