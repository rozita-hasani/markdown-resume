'use client';

import { useState, useEffect, useRef } from 'react';
import { TemplateVariables, extractTemplateVariables, getDefaultTemplateVariables } from '@/lib/templateEngine';
import { SidebarSection } from './SidebarSection';
import { Variable, Plus, Trash2 } from 'lucide-react';

interface TemplateVariablesSectionProps {
    markdown: string;
    templateVariables: TemplateVariables;
    onTemplateVariablesChange: (variables: TemplateVariables) => void;
}

export function TemplateVariablesSection({ 
    markdown, 
    templateVariables, 
    onTemplateVariablesChange 
}: TemplateVariablesSectionProps) {
    const [localVariables, setLocalVariables] = useState<TemplateVariables>(templateVariables);
    const isInitializedRef = useRef(false);
    const isMountedRef = useRef(false);

    // Mark component as mounted
    useEffect(() => {
        isMountedRef.current = true;
    }, []);

    // Extract variables from markdown and merge with existing ones
    useEffect(() => {
        if (!isInitializedRef.current) {
            isInitializedRef.current = true;
            return;
        }

        // Only proceed if component is mounted
        if (!isMountedRef.current) {
            return;
        }

        const extractedVars = extractTemplateVariables(markdown);
        const defaultVars = getDefaultTemplateVariables();
        
        const newVariables: TemplateVariables = {};
        
        // Add extracted variables with default values if they don't exist
        extractedVars.forEach(varName => {
            if (!templateVariables[varName]) {
                newVariables[varName] = defaultVars[varName] || '';
            } else {
                newVariables[varName] = templateVariables[varName];
            }
        });
        
        // Keep existing variables that are still in the markdown
        Object.keys(templateVariables).forEach(key => {
            if (extractedVars.includes(key)) {
                newVariables[key] = templateVariables[key];
            }
        });
        
        setLocalVariables(newVariables);
        
        // Only call onTemplateVariablesChange if the variables actually changed and we're mounted
        const hasChanges = JSON.stringify(newVariables) !== JSON.stringify(templateVariables);
        if (hasChanges && isMountedRef.current) {
            onTemplateVariablesChange(newVariables);
        }
    }, [markdown, templateVariables, onTemplateVariablesChange]);

    const handleVariableChange = (key: string, value: string | object | Array<Record<string, unknown>>) => {
        const updatedVariables = { ...localVariables, [key]: value };
        setLocalVariables(updatedVariables);
        onTemplateVariablesChange(updatedVariables);
    };

    const handleArrayItemChange = (arrayKey: string, index: number, field: string, value: string) => {
        const currentArray = localVariables[arrayKey] as Array<Record<string, unknown>>;
        if (Array.isArray(currentArray)) {
            const updatedArray = [...currentArray];
            updatedArray[index] = { ...updatedArray[index], [field]: value };
            handleVariableChange(arrayKey, updatedArray);
        }
    };

    const addArrayItem = (arrayKey: string) => {
        const currentArray = localVariables[arrayKey] as Array<Record<string, unknown>>;
        if (Array.isArray(currentArray) && currentArray.length > 0) {
            const newItem = { ...currentArray[0] };
            // Clear the values for the new item
            Object.keys(newItem).forEach(key => {
                newItem[key] = '';
            });
            handleVariableChange(arrayKey, [...currentArray, newItem]);
        }
    };

    const removeArrayItem = (arrayKey: string, index: number) => {
        const currentArray = localVariables[arrayKey] as Array<Record<string, unknown>>;
        if (Array.isArray(currentArray)) {
            const updatedArray = currentArray.filter((_, i) => i !== index);
            handleVariableChange(arrayKey, updatedArray);
        }
    };

    const handleResetToDefaults = () => {
        const defaultVars = getDefaultTemplateVariables();
        const extractedVars = extractTemplateVariables(markdown);
        
        const resetVariables: TemplateVariables = {};
        extractedVars.forEach(varName => {
            resetVariables[varName] = defaultVars[varName] || '';
        });
        
        setLocalVariables(resetVariables);
        onTemplateVariablesChange(resetVariables);
    };

    const renderVariableInput = (key: string, value: unknown) => {
        if (Array.isArray(value)) {
            return (
                <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <button
                            onClick={() => addArrayItem(key)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            title="Add item"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                    {value.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded p-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Item {index + 1}</span>
                                {value.length > 1 && (
                                    <button
                                        onClick={() => removeArrayItem(key, index)}
                                        className="p-1 text-red-500 hover:text-red-700"
                                        title="Remove item"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                            {typeof item === 'object' && item !== null && (
                                <div className="space-y-1">
                                    {Object.entries(item as Record<string, unknown>).map(([field, fieldValue]) => (
                                        <div key={field}>
                                            <label className="text-xs text-gray-600 capitalize">
                                                {field.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <textarea
                                                value={String(fieldValue || '')}
                                                onChange={(e) => handleArrayItemChange(key, index, field, e.target.value)}
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                rows={field === 'description' ? 2 : 1}
                                                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div key={key} className="space-y-1">
                <label className="text-xs font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <textarea
                    value={String(value || '')}
                    onChange={(e) => handleVariableChange(key, e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={key === 'summary' ? 3 : 1}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}...`}
                />
            </div>
        );
    };

    const variableEntries = Object.entries(localVariables);

    return (
        <SidebarSection title="Template Variables" icon={<Variable className="h-4 w-4" />}>
            <div className="space-y-3 pb-4">
                {variableEntries.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No template variables found. Use &#123;&#123;variable&#125;&#125; syntax in your markdown.
                    </p>
                ) : (
                    <>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {variableEntries.map(([key, value]) => renderVariableInput(key, value))}
                        </div>
                        <button
                            onClick={handleResetToDefaults}
                            className="w-full px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                            Reset to Defaults
                        </button>
                    </>
                )}
            </div>
        </SidebarSection>
    );
} 