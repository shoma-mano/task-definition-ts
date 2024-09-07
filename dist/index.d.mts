/**
 * Interface representing an ECS Task Definition.
 */
interface ECSTaskDefinition {
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
    runtimePlatform?: RuntimePlatform;
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
 * Port mapping configuration for containers in an ECS task.
 *
 * Port mappings allow containers to access ports on the host container instance
 * to send or receive traffic. For task definitions that use the `awsvpc` network mode,
 * only specify the `containerPort`. The `hostPort` can be left blank or set to the same
 * value as `containerPort`.
 *
 * Note:
 * - Windows containers use the NetNAT gateway address instead of localhost for port mappings.
 * - When using the `host` network mode, `hostPort` must either be undefined or match `containerPort`.
 *
 * After a task reaches the RUNNING status, manual and automatic port assignments are visible in:
 * - Console: In the "Network Bindings" section of the container description.
 * - AWS CLI: Via the `networkBindings` field in the `describe-tasks` output.
 * - API: In the `DescribeTasks` response.
 * - Metadata: Via the task metadata endpoint.
 *
 * For more information, see the AWS documentation on port mappings in ECS.
 */
interface PortMapping {
    /**
     * The port number on the container that's bound to the user-specified
     * or automatically assigned `hostPort`.
     *
     * Required when port mappings are used. For tasks using the Fargate launch type,
     * exposed ports must be specified using `containerPort`.
     */
    containerPort: number;
    /**
     * The port number on the host container instance that's reserved for your container.
     *
     * If using the Fargate launch type, this can be left blank or set to the same value as `containerPort`.
     * For EC2 tasks, omitting this value causes a dynamic port to be assigned from the ephemeral port range.
     */
    hostPort?: number;
    /**
     * The protocol used for the port mapping. Defaults to "tcp".
     *
     * Supported values:
     * - "tcp": Transmission Control Protocol
     * - "udp": User Datagram Protocol
     */
    protocol?: "tcp" | "udp";
    /**
     * The application protocol that's used for the port mapping.
     * This parameter only applies to Service Connect and should be set to the
     * protocol that your application uses.
     *
     * Valid values:
     * - "HTTP": HyperText Transfer Protocol
     * - "HTTP2": HyperText Transfer Protocol/2
     * - "GRPC": gRPC Remote Procedure Call
     *
     * If this parameter is set, Amazon ECS adds protocol-specific connection handling
     * to the service connect proxy and protocol-specific telemetry in the Amazon ECS console
     * and CloudWatch. If no value is set, TCP is used as the default, but without protocol-specific telemetry.
     */
    appProtocol?: string;
    /**
     * The name used for the port mapping. This parameter is required when Service Connect is used
     * in a service.
     *
     * This is the name that will be used in the Service Connect configuration.
     */
    name?: string;
    /**
     * The port number range on the container that's bound to the dynamically mapped host port range.
     *
     * This parameter is only available when using the `register-task-definition` API.
     * The following rules apply:
     * - The network mode must be either `bridge` or `awsvpc`.
     * - The range must be between 1 and 65535.
     * - You can't specify overlapping ranges.
     *
     * For more information, see the `register-task-definition` in the AWS CLI Reference.
     */
    containerPortRange?: string;
    /**
     * The port number range on the host that's used with the network binding.
     * This is automatically assigned by Docker and passed through the Amazon ECS agent.
     *
     * You don't need to specify a `hostPortRange` directly, as it is assigned by Docker.
     */
    hostPortRange?: string;
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
    options?: {
        [key: string]: string;
    };
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
    driverOpts?: {
        [key: string]: string;
    };
    labels?: {
        [key: string]: string;
    };
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
/**
 * The runtime platform configuration for an ECS task definition.
 * This configuration defines the operating system family and CPU architecture.
 */
interface RuntimePlatform {
    /**
     * The operating system family for the ECS task.
     *
     * Required: Conditional (Required for tasks hosted on Fargate)
     *
     * Default: LINUX
     *
     * Valid values for Fargate tasks:
     * - "LINUX"
     * - "WINDOWS_SERVER_2019_FULL"
     * - "WINDOWS_SERVER_2019_CORE"
     * - "WINDOWS_SERVER_2022_FULL"
     * - "WINDOWS_SERVER_2022_CORE"
     *
     * Valid values for EC2 tasks:
     * - "LINUX"
     * - "WINDOWS_SERVER_2016_FULL"
     * - "WINDOWS_SERVER_2019_FULL"
     * - "WINDOWS_SERVER_2019_CORE"
     * - "WINDOWS_SERVER_2022_FULL"
     * - "WINDOWS_SERVER_2022_CORE"
     * - "WINDOWS_SERVER_2004_CORE"
     * - "WINDOWS_SERVER_20H2_CORE"
     *
     * All task definitions used in the same service must have the same value for this parameter.
     * When the task definition is part of a service, this value must match the `platformFamily` of the service.
     */
    operatingSystemFamily?: "LINUX" | "WINDOWS_SERVER_2019_FULL" | "WINDOWS_SERVER_2019_CORE" | "WINDOWS_SERVER_2022_FULL" | "WINDOWS_SERVER_2022_CORE" | "WINDOWS_SERVER_2016_FULL" | "WINDOWS_SERVER_2004_CORE" | "WINDOWS_SERVER_20H2_CORE";
    /**
     * The CPU architecture for the ECS task.
     *
     * Required: Conditional (Required for tasks hosted on Fargate)
     *
     * Default: X86_64
     *
     * Valid values:
     * - "X86_64" (Default)
     * - "ARM64"
     *
     * If left null, the default value is automatically assigned for Fargate tasks upon initiation.
     *
     * When using Linux tasks with Fargate or EC2, the value can be set to "ARM64" for ARM-based workloads.
     * All task definitions used in the same service must have the same value for this parameter.
     */
    cpuArchitecture?: "X86_64" | "ARM64";
}

declare const defineTaskDefinition: (props: ECSTaskDefinition, distPath?: string) => void;

export { type ContainerDefinition, type Device, type DockerVolumeConfiguration, type ECSTaskDefinition, type EFSVolumeConfiguration, type EnvironmentVariable, type EphemeralStorage, type HealthCheck, type LinuxParameters, type LogConfiguration, type MountPoint, type PlacementConstraint, type PortMapping, type RuntimePlatform, type Secret, type Tag, type Tmpfs, type Ulimit, type Volume, type VolumeFrom, defineTaskDefinition };
