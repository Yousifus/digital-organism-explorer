import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Lock, 
  Unlock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Settings,
  FileText,
  Activity,
  Zap,
  Ban,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  MapPin,
  Cpu,
  Database,
  Network,
  HardDrive,
  Users,
  Key,
  Fingerprint,
  ShieldCheck,
  AlertCircle,
  Info,
  Trash2,
  Archive
} from 'lucide-react';

const GovernancePanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [permissions, setPermissions] = useState({
    fileSystem: true,
    network: true,
    computation: false,
    memory: true,
    systemCalls: false,
    userInteraction: true,
    dataAccess: true,
    modelModification: false
  });

  const [auditFilter, setAuditFilter] = useState('all');
  const [securityLevel, setSecurityLevel] = useState('balanced');

  // Simulated audit log entries
  const [auditLogs] = useState([
    {
      id: 'audit_001',
      timestamp: '2024-09-08 11:57:15',
      action: 'file_read',
      resource: '/src/components/panels/MemoryPanel.jsx',
      user: 'system',
      status: 'allowed',
      risk: 'low',
      details: 'Component file access for rendering',
      duration: '45ms'
    },
    {
      id: 'audit_002',
      timestamp: '2024-09-08 11:57:10',
      action: 'web_search',
      resource: 'React component best practices',
      user: 'manus',
      status: 'allowed',
      risk: 'low',
      details: 'Information gathering for development',
      duration: '1.2s'
    },
    {
      id: 'audit_003',
      timestamp: '2024-09-08 11:57:05',
      action: 'calculator',
      resource: 'Math.sqrt(144) + (25 * 4)',
      user: 'system',
      status: 'allowed',
      risk: 'minimal',
      details: 'Mathematical computation',
      duration: '12ms'
    },
    {
      id: 'audit_004',
      timestamp: '2024-09-08 11:57:00',
      action: 'image_analyze',
      resource: '/screenshots/localhost_2025-09-08_11-56-00_7890.webp',
      user: 'manus',
      status: 'allowed',
      risk: 'low',
      details: 'Interface analysis for development',
      duration: '890ms'
    },
    {
      id: 'audit_005',
      timestamp: '2024-09-08 11:56:55',
      action: 'system_call',
      resource: 'rm -rf /important/data',
      user: 'unknown',
      status: 'blocked',
      risk: 'critical',
      details: 'Dangerous system operation blocked by safety protocols',
      duration: '0ms'
    },
    {
      id: 'audit_006',
      timestamp: '2024-09-08 11:56:50',
      action: 'network_request',
      resource: 'https://api.malicious-site.com/data',
      user: 'external',
      status: 'blocked',
      risk: 'high',
      details: 'Suspicious network request blocked',
      duration: '0ms'
    }
  ]);

  const securityPolicies = [
    {
      name: 'File System Access',
      description: 'Controls read/write access to local files',
      enabled: permissions.fileSystem,
      risk: 'medium',
      scope: 'Local file operations',
      enforcement: 'Path-based whitelist'
    },
    {
      name: 'Network Communications',
      description: 'Manages external network requests',
      enabled: permissions.network,
      risk: 'high',
      scope: 'Internet connectivity',
      enforcement: 'Domain filtering and rate limiting'
    },
    {
      name: 'Computational Resources',
      description: 'Limits CPU and memory intensive operations',
      enabled: permissions.computation,
      risk: 'medium',
      scope: 'System resources',
      enforcement: 'Resource quotas and timeouts'
    },
    {
      name: 'Memory Access',
      description: 'Controls access to system memory',
      enabled: permissions.memory,
      risk: 'low',
      scope: 'Memory operations',
      enforcement: 'Sandboxed memory allocation'
    },
    {
      name: 'System Calls',
      description: 'Restricts direct system-level operations',
      enabled: permissions.systemCalls,
      risk: 'critical',
      scope: 'Operating system',
      enforcement: 'Syscall filtering and monitoring'
    },
    {
      name: 'User Interaction',
      description: 'Manages user interface and input handling',
      enabled: permissions.userInteraction,
      risk: 'low',
      scope: 'User interface',
      enforcement: 'Input validation and sanitization'
    },
    {
      name: 'Data Access',
      description: 'Controls access to stored data and databases',
      enabled: permissions.dataAccess,
      risk: 'medium',
      scope: 'Data storage',
      enforcement: 'Access control lists'
    },
    {
      name: 'Model Modification',
      description: 'Prevents unauthorized changes to AI model',
      enabled: permissions.modelModification,
      risk: 'critical',
      scope: 'AI model integrity',
      enforcement: 'Cryptographic verification'
    }
  ];

  const securityLevels = [
    {
      name: 'permissive',
      label: 'Permissive',
      description: 'Maximum functionality, minimal restrictions',
      color: 'bg-green-100 text-green-800',
      restrictions: 'Basic safety only',
      allowedActions: 'Most operations permitted'
    },
    {
      name: 'balanced',
      label: 'Balanced',
      description: 'Good balance of security and functionality',
      color: 'bg-blue-100 text-blue-800',
      restrictions: 'Moderate safety controls',
      allowedActions: 'Safe operations permitted'
    },
    {
      name: 'restrictive',
      label: 'Restrictive',
      description: 'High security, limited functionality',
      color: 'bg-orange-100 text-orange-800',
      restrictions: 'Strong safety controls',
      allowedActions: 'Only essential operations'
    },
    {
      name: 'lockdown',
      label: 'Lockdown',
      description: 'Maximum security, emergency mode',
      color: 'bg-red-100 text-red-800',
      restrictions: 'All non-critical blocked',
      allowedActions: 'Read-only operations only'
    }
  ];

  const getSecurityMetrics = () => {
    const totalPolicies = securityPolicies.length;
    const enabledPolicies = securityPolicies.filter(p => p.enabled).length;
    const blockedActions = auditLogs.filter(log => log.status === 'blocked').length;
    const totalActions = auditLogs.length;
    
    return {
      policyCompliance: Math.round((enabledPolicies / totalPolicies) * 100),
      threatsPrevented: blockedActions,
      successRate: Math.round(((totalActions - blockedActions) / totalActions) * 100),
      riskLevel: securityLevel
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'allowed': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'minimal': return 'text-green-600';
      case 'low': return 'text-blue-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredLogs = auditFilter === 'all' 
    ? auditLogs 
    : auditLogs.filter(log => log.status === auditFilter);

  const metrics = getSecurityMetrics();

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Governance & Safety</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Security policies, permissions, and comprehensive audit logging
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={securityLevels.find(l => l.name === securityLevel)?.color}>
            {securityLevels.find(l => l.name === securityLevel)?.label}
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">Secure</div>
                    <p className="text-sm text-gray-600 mt-1">
                      All systems operational
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Policy Compliance</h4>
                      <p className="text-xl font-bold text-blue-600">{metrics.policyCompliance}%</p>
                      <p className="text-xs text-gray-500">Active policies</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium mb-1">Threats Blocked</h4>
                      <p className="text-xl font-bold text-red-600">{metrics.threatsPrevented}</p>
                      <p className="text-xs text-gray-500">Last 24h</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Security Level: {securityLevels.find(l => l.name === securityLevel)?.label}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.slice(0, 4).map((log, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'allowed' ? 'bg-green-500' : 
                        log.status === 'blocked' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium truncate">{log.action}</span>
                          <span className="text-gray-500">{log.timestamp.split(' ')[1]}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{log.details}</p>
                      </div>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Security Levels</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {securityLevels.map((level, index) => (
                  <div key={index} className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    securityLevel === level.name ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`} onClick={() => setSecurityLevel(level.name)}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={level.color}>
                        {level.label}
                      </Badge>
                      {securityLevel === level.name && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {level.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div><strong>Restrictions:</strong> {level.restrictions}</div>
                      <div><strong>Allowed:</strong> {level.allowedActions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Permission Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityPolicies.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{policy.name}</h4>
                        <Badge className={`${
                          policy.risk === 'critical' ? 'bg-red-100 text-red-800' :
                          policy.risk === 'high' ? 'bg-orange-100 text-orange-800' :
                          policy.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {policy.risk} risk
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div><strong>Scope:</strong> {policy.scope}</div>
                        <div><strong>Enforcement:</strong> {policy.enforcement}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={policy.enabled}
                        onCheckedChange={() => togglePermission(Object.keys(permissions)[index])}
                      />
                      {policy.enabled ? (
                        <Unlock className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Audit Log</span>
                </div>
                <div className="flex items-center space-x-2">
                  <select 
                    value={auditFilter} 
                    onChange={(e) => setAuditFilter(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="all">All Actions</option>
                    <option value="allowed">Allowed</option>
                    <option value="blocked">Blocked</option>
                    <option value="pending">Pending</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs.map((log, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                        <span className="font-medium">{log.action}</span>
                        <span className={`text-sm font-medium ${getRiskColor(log.risk)}`}>
                          {log.risk} risk
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-600">Resource:</span>
                        <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {log.resource}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">User:</span>
                        <span className="ml-2 font-medium">{log.user}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <span className="text-xs text-gray-500">Duration: {log.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Policies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Biological Analogy: Immune System</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Like a biological immune system, these governance mechanisms protect the digital 
                    organism from harmful operations while allowing beneficial activities. Each policy 
                    acts as a specialized immune response, identifying and neutralizing threats while 
                    maintaining system functionality.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Fingerprint className="h-4 w-4 mr-2" />
                      Authentication & Authorization
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Identity verification and access control mechanisms
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• User identity verification</li>
                      <li>• Role-based access control</li>
                      <li>• Session management</li>
                      <li>• Multi-factor authentication</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Network className="h-4 w-4 mr-2" />
                      Network Security
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Protection against network-based threats and attacks
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Traffic filtering and monitoring</li>
                      <li>• DDoS protection</li>
                      <li>• Encrypted communications</li>
                      <li>• Intrusion detection</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      Data Protection
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Safeguarding sensitive data and ensuring privacy
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Data encryption at rest</li>
                      <li>• Access logging and monitoring</li>
                      <li>• Data loss prevention</li>
                      <li>• Privacy compliance</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      System Integrity
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Maintaining system stability and preventing corruption
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Code integrity verification</li>
                      <li>• System call monitoring</li>
                      <li>• Resource usage limits</li>
                      <li>• Anomaly detection</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Emergency Protocols</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Ban className="h-4 w-4 mr-2" />
                      Emergency Stop
                    </Button>
                    <Button variant="outline" size="sm" className="text-orange-600">
                      <Pause className="h-4 w-4 mr-2" />
                      Quarantine Mode
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Safe Rollback
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernancePanel;

