'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    BarChart,
    Settings,
    LogOut,
    Save,
    Eye,
    Terminal,
    Clock,
    ExternalLink,
    Plus,
    Trash2,
    Database
} from 'lucide-react'

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [activeTab, setActiveTab] = useState('analytics')
    const [data, setData] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isLoggedIn) {
            fetchData()
        }
    }, [isLoggedIn])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/content')
            const json = await res.json()
            setData(json)
        } catch (e) {
            setError('Failed to fetch data')
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        // In a real app, this password should be validated on server
        // For this demo, we'll use 'admin123' or environment variable
        if (password === 'ayush-admin') {
            setIsLoggedIn(true)
            localStorage.setItem('adminKey', password)
        } else {
            setError('Invalid admin password')
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': password
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                alert('Portfolio updated successfully!')
            } else {
                alert('Update failed - Check password')
            }
        } catch (e) {
            alert('Network error')
        }
        setSaving(false)
    }

    const getTrafficData = () => {
        if (!data?.visitors) return Array(24).fill(0)
        const hourly = Array(24).fill(0)
        const now = new Date()
        const today = now.toDateString()

        data.visitors.forEach(v => {
            const d = new Date(v.timestamp)
            if (d.toDateString() === today) {
                hourly[d.getHours()] += 1
            }
        })
        return hourly
    }

    const addItem = (type, categoryIdx = null) => {
        const newData = { ...data }
        if (type === 'project') {
            newData.projects.unshift({ title: 'New Project', description: '', tags: [], github: '#' })
        } else if (type === 'experience') {
            newData.experiences.unshift({ role: 'New Role', company: 'Company', period: '2024', location: '', achievements: [], skills: [] })
        } else if (type === 'skillCategory') {
            newData.skills.push({ category: 'New Category', skills: [] })
        } else if (type === 'skill' && categoryIdx !== null) {
            newData.skills[categoryIdx].skills.push({ name: 'New Skill', level: 80 })
        }
        setData(newData)
    }

    const removeItem = (type, idx, skillIdx = null) => {
        if (!confirm('Are you sure you want to delete this item?')) return
        const newData = { ...data }
        if (type === 'project') newData.projects.splice(idx, 1)
        else if (type === 'experience') newData.experiences.splice(idx, 1)
        else if (type === 'skillCategory') newData.skills.splice(idx, 1)
        else if (type === 'skill') newData.skills[idx].skills.splice(skillIdx, 1)
        setData(newData)
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-tech-darker flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-tech-dark/80 p-8 rounded-2xl cyber-border w-full max-w-md glow-box"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-tech-blue/20 rounded-full flex items-center justify-center">
                            <Terminal className="text-tech-blue w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-center text-white mb-2">Admin Terminal</h1>
                    <p className="text-gray-400 text-center mb-8">Secure access to portfolio control center</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Admin Authorization Key"
                                className="w-full bg-tech-gray border border-tech-cyan/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-tech-blue"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button className="w-full bg-gradient-to-r from-tech-blue to-tech-purple py-3 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-tech-blue/40 transition-all">
                            INITIALIZE ACCESS
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-tech-darker text-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-tech-dark border-r border-tech-cyan/20 flex flex-col h-screen fixed">
                <div className="p-6 border-b border-tech-cyan/20">
                    <h2 className="text-xl font-bold text-gradient">CONTROL PANEL</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <SidebarBtn
                        active={activeTab === 'analytics'}
                        onClick={() => setActiveTab('analytics')}
                        icon={<BarChart size={20} />}
                        label="Analytics"
                    />
                    <SidebarBtn
                        active={activeTab === 'content'}
                        onClick={() => setActiveTab('content')}
                        icon={<Settings size={20} />}
                        label="Content Editor"
                    />
                    <SidebarBtn
                        active={activeTab === 'visitors'}
                        onClick={() => setActiveTab('visitors')}
                        icon={<Users size={20} />}
                        label="Live Visitors"
                    />
                </nav>

                <div className="p-4 border-t border-tech-cyan/20">
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full p-2"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
                        <p className="text-gray-400">Manage your digital presence</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Eye size={18} /> Back to Home
                        </a>
                        {activeTab === 'content' && (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-tech-blue/20 text-tech-blue px-4 py-2 rounded-lg border border-tech-blue/50 flex items-center gap-2 hover:bg-tech-blue/30 transition-all font-bold"
                            >
                                <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </header>

                {activeTab === 'analytics' && data && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-6">
                            <StatCard label="Total Visits" value={data.visitors?.length || 0} icon={<Users className="text-tech-blue" />} color="blue" />
                            <StatCard label="Unique Agents" value={new Set(data.visitors?.map(v => v.ip)).size} icon={<Terminal className="text-tech-purple" />} color="purple" />
                            <StatCard label="Active Projects" value={data.projects?.length} icon={<BarChart className="text-tech-cyan" />} color="cyan" />
                            <StatCard label="Skills Logged" value={data.skills?.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)} icon={<Database className="text-tech-blue" />} color="indigo" />
                        </div>

                        <div className="bg-tech-dark p-6 rounded-xl border border-tech-cyan/20 glow-box">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">24-Hour Traffic Intensity</h3>
                                <div className="text-xs text-tech-cyan font-mono px-2 py-1 bg-tech-cyan/10 rounded">LIVE FEED</div>
                            </div>
                            <div className="h-64 flex items-end gap-1 px-2">
                                {getTrafficData().map((count, i) => (
                                    <div key={i} className="flex-1 group relative">
                                        <div
                                            className="bg-tech-blue/30 rounded-t-sm hover:bg-tech-cyan/60 transition-all border-t border-tech-blue/50"
                                            style={{ height: `${Math.min(count * 20 + 2, 100)}%` }}
                                        ></div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-tech-darker border border-tech-cyan/30 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                            {count} visits at {i}:00
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] text-gray-500 uppercase font-mono px-2">
                                {Array.from({ length: 24 }).map((_, i) => i % 4 === 0 ? <span key={i}>{i}:00</span> : null)}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && data && (
                    <div className="space-y-8 bg-tech-dark p-8 rounded-xl border border-tech-cyan/20">
                        <div>
                            <h3 className="text-xl font-bold text-tech-cyan mb-4 flex items-center gap-2">
                                <Terminal size={20} /> Hero Section
                            </h3>
                            <div className="space-y-4">
                                <Input label="Name" value={data.hero.name} onChange={(v) => setData({ ...data, hero: { ...data.hero, name: v } })} />
                                <Input label="Professional Role" value={data.hero.role} onChange={(v) => setData({ ...data, hero: { ...data.hero, role: v } })} />
                                <TextArea label="Bio Description" value={data.hero.description} onChange={(v) => setData({ ...data, hero: { ...data.hero, description: v } })} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <h3 className="text-xl font-bold text-tech-blue mb-4 flex items-center gap-2">
                                <Users size={20} /> About Section
                            </h3>
                            <div className="space-y-4">
                                <TextArea label="Long Bio" value={data.about?.bio || ''} onChange={(v) => setData({ ...data, about: { ...data.about, bio: v } })} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-tech-purple flex items-center gap-2">
                                    <Clock size={20} /> Experience
                                </h3>
                                <button onClick={() => addItem('experience')} className="flex items-center gap-1 text-xs bg-tech-purple/20 text-tech-purple px-2 py-1 rounded hover:bg-tech-purple/30">
                                    <Plus size={14} /> Add Role
                                </button>
                            </div>
                            <div className="space-y-6">
                                {data.experiences.map((exp, idx) => (
                                    <div key={idx} className="p-6 border border-tech-purple/20 bg-tech-purple/5 rounded-xl space-y-4 relative group">
                                        <button onClick={() => removeItem('experience', idx)} className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Role" value={exp.role} onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].role = v;
                                                setData({ ...data, experiences: exps });
                                            }} />
                                            <Input label="Company" value={exp.company} onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].company = v;
                                                setData({ ...data, experiences: exps });
                                            }} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Period" value={exp.period} onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].period = v;
                                                setData({ ...data, experiences: exps });
                                            }} />
                                            <Input label="Location" value={exp.location} onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].location = v;
                                                setData({ ...data, experiences: exps });
                                            }} />
                                        </div>
                                        <TextArea
                                            label="Achievements (One per line)"
                                            value={exp.achievements?.join('\n') || ''}
                                            onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].achievements = v.split('\n').filter(l => l.trim() !== '');
                                                setData({ ...data, experiences: exps });
                                            }}
                                        />
                                        <Input
                                            label="Skills (Comma separated)"
                                            value={exp.skills?.join(', ') || ''}
                                            onChange={(v) => {
                                                const exps = [...data.experiences];
                                                exps[idx].skills = v.split(',').map(s => s.trim()).filter(s => s !== '');
                                                setData({ ...data, experiences: exps });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-tech-cyan flex items-center gap-2">
                                    <BarChart size={20} /> Projects
                                </h3>
                                <button onClick={() => addItem('project')} className="flex items-center gap-1 text-xs bg-tech-cyan/20 text-tech-cyan px-2 py-1 rounded hover:bg-tech-cyan/30">
                                    <Plus size={14} /> Add Project
                                </button>
                            </div>
                            <div className="space-y-6">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="p-6 border border-tech-cyan/20 bg-tech-cyan/5 rounded-xl space-y-4 relative group">
                                        <button onClick={() => removeItem('project', idx)} className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <Input label="Project Title" value={proj.title} onChange={(v) => {
                                            const projs = [...data.projects];
                                            projs[idx].title = v;
                                            setData({ ...data, projects: projs });
                                        }} />
                                        <TextArea label="Description" value={proj.description} onChange={(v) => {
                                            const projs = [...data.projects];
                                            projs[idx].description = v;
                                            setData({ ...data, projects: projs });
                                        }} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="GitHub Link" value={proj.github} onChange={(v) => {
                                                const projs = [...data.projects];
                                                projs[idx].github = v;
                                                setData({ ...data, projects: projs });
                                            }} />
                                            <Input label="Tags (Comma separated)" value={proj.tags?.join(', ') || ''} onChange={(v) => {
                                                const projs = [...data.projects];
                                                projs[idx].tags = v.split(',').map(t => t.trim()).filter(t => t !== '');
                                                setData({ ...data, projects: projs });
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-tech-blue flex items-center gap-2">
                                    <Database size={20} /> Expertise & Skills
                                </h3>
                                <button onClick={() => addItem('skillCategory')} className="flex items-center gap-1 text-xs bg-tech-blue/20 text-tech-blue px-2 py-1 rounded hover:bg-tech-blue/30">
                                    <Plus size={14} /> Add Category
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.skills?.map((cat, idx) => (
                                    <div key={idx} className="p-6 border border-tech-blue/20 bg-tech-blue/5 rounded-xl space-y-4 relative group">
                                        <button onClick={() => removeItem('skillCategory', idx)} className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                        <Input label="Category Name" value={cat.category} onChange={(v) => {
                                            const skills = [...data.skills];
                                            skills[idx].category = v;
                                            setData({ ...data, skills });
                                        }} />
                                        <div className="space-y-3">
                                            {cat.skills?.map((s, sIdx) => (
                                                <div key={sIdx} className="flex gap-2 items-end group/skill">
                                                    <div className="flex-1">
                                                        <Input label="Skill Name" value={s.name} onChange={(v) => {
                                                            const skills = [...data.skills];
                                                            skills[idx].skills[sIdx].name = v;
                                                            setData({ ...data, skills });
                                                        }} />
                                                    </div>
                                                    <div className="w-20">
                                                        <Input label="Level %" value={s.level} onChange={(v) => {
                                                            const skills = [...data.skills];
                                                            skills[idx].skills[sIdx].level = parseInt(v) || 0;
                                                            setData({ ...data, skills });
                                                        }} />
                                                    </div>
                                                    <button onClick={() => removeItem('skill', idx, sIdx)} className="mb-2 text-gray-600 hover:text-red-400">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button onClick={() => addItem('skill', idx)} className="w-full py-2 border border-dashed border-tech-blue/30 text-tech-blue/60 text-xs rounded hover:border-tech-blue hover:text-tech-blue transition-all">
                                                + Add Skill to {cat.category}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'visitors' && data && (
                    <div className="bg-tech-dark rounded-xl border border-tech-cyan/20 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-tech-gray/50 text-tech-cyan text-sm uppercase">
                                <tr>
                                    <th className="p-4">Time</th>
                                    <th className="p-4">IP Address</th>
                                    <th className="p-4">Page</th>
                                    <th className="p-4">Referrer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {[...data.visitors].reverse().slice(0, 50).map((v, i) => (
                                    <tr key={i} className="hover:bg-tech-gray/20 transition-colors">
                                        <td className="p-4 text-xs font-mono text-gray-500">{new Date(v.timestamp).toLocaleString()}</td>
                                        <td className="p-4 text-sm font-semibold">{v.ip}</td>
                                        <td className="p-4 text-xs text-tech-blue">{v.page}</td>
                                        <td className="p-4 text-xs truncate max-w-[200px] text-gray-400">{v.referrer || 'Direct'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

function SidebarBtn({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${active
                ? 'bg-tech-blue/20 text-tech-blue border border-tech-blue/30'
                : 'text-gray-400 hover:bg-tech-gray/30 hover:text-white'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="bg-tech-dark p-6 rounded-xl border border-tech-cyan/20 flex items-center gap-4 glow-box">
            <div className={`p-4 rounded-xl bg-${color}-500/10`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    )
}

function Input({ label, value, onChange }) {
    return (
        <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase font-mono">{label}</label>
            <input
                className="w-full bg-tech-gray/30 border border-gray-800 rounded-lg p-3 text-white focus:border-tech-blue outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

function TextArea({ label, value, onChange }) {
    return (
        <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase font-mono">{label}</label>
            <textarea
                rows={4}
                className="w-full bg-tech-gray/30 border border-gray-800 rounded-lg p-3 text-white focus:border-tech-blue outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
